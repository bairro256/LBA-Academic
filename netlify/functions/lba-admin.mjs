import { getStore } from "@netlify/blobs";
import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
const store = () => getStore("lba-site-content");
const json = (body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
const hash = value => createHash("sha256").update(value).digest("hex");
async function valid(req){const auth=req.headers.get("authorization")||"";const token=auth.startsWith("Bearer ")?auth.slice(7):"";if(!token)return false;const record=await (await store()).get("session:"+hash(token),{type:"json",consistency:"strong"});return !!record&&record.expires>Date.now()}
export default async (req)=>{
 if(req.method!=="POST")return json({error:"Método não permitido."},405);
 try{
  const body=await req.json();const db=await store();
  if(body.action==="login"){const expected=process.env.LBA_ADMIN_CODE||"";const supplied=String(body.code||"");if(!expected||supplied.length!==expected.length||!timingSafeEqual(Buffer.from(supplied),Buffer.from(expected)))return json({error:"Código incorrecto."},401);const token=randomBytes(32).toString("hex");await db.setJSON("session:"+hash(token),{expires:Date.now()+8*60*60*1000});return json({token})}
  if(!await valid(req))return json({error:"Sessão expirada. Entra novamente."},401);
  if(body.action==="load"){const content=await db.get("content",{type:"json",consistency:"strong"});return json({content:content||{}})}
  if(body.action==="save"){if(!body.content||typeof body.content!=="object")return json({error:"Conteúdo inválido."},400);await db.setJSON("content",body.content);return json({ok:true})}
  return json({error:"Acção desconhecida."},400)
 }catch(e){return json({error:"Erro interno ao processar o pedido."},500)}
};