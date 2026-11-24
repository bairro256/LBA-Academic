import { getStore } from "@netlify/blobs";
const db=()=>getStore("lba-site-content");
export default async (req)=>{
 const url=new URL(req.url);
 if(url.searchParams.has("media")){const id=url.searchParams.get("media");if(!/^[a-f0-9]{32}$/.test(id))return new Response("Not found",{status:404});const item=await (await db()).get("media:"+id,{type:"blob"});if(!item)return new Response("Not found",{status:404});return new Response(item,{headers:{"Content-Type":item.type||"application/octet-stream","Cache-Control":"public, max-age=300"}})}
 const content=await (await db()).get("content",{type:"json"});return Response.json(content||{},{headers:{"Cache-Control":"public, max-age=30"}})
};