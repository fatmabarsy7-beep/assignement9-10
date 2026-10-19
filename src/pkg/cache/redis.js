

export class RedisCachProvider {
    client;
    constructor(config){
        this.client=new Redis({
            host:config.host,
            port:config.port,
            password:config.password,
            lazyConect:true,
            maxloadingRetryTime:3
        });
         this.client.on('err',(err)=>console.log('',err.message));
          
        this.client.connect().cache(err=>console.log("fail to connect to redis",err.message));
    
    }

    
 async set(key,value,ttl){
      return await this.client.set(key,value,'EX',ttl);
    }
 async get(key){
      return await this.client.get(key);
    }
async del(key){
     return await this.client.del(key);
    }
}

// new RedisCachProvider ({
//     host:"127.0.0.1",
//     port:6379,
//     password:""
// })