const btn01 = document.getElementById('btn01');
const content = document.getElementsByClassName('content')[0];
btn01.onclick = ()=>{
    const xhr = new XMLHttpRequest();


    // 接收响应数据
    // onreadystatechange  当xhr对象的准备状态发生改变的时候
    // 5种状态
            // 0  实例 XMLHttpRequest
            // 1 open还未调用    可以修改响应头
            // 2 open已经调用了  不能修改响应头
            // 3 请求的部分数据响应回来了  
            // 4 请求的数据完整的响应完毕
    xhr.onreadystatechange = ()=>{
        // 设置请求头
        if(xhr.readyState===1){
            xhr.setRequestHeader('key','hello');
        }
        
        // if(xhr.readyState===2){
        //     xhr.setRequestHeader('key','hello');
        // }---报错 

        if(xhr.readyState===4){
            if(xhr.status>=200 && xhr.status<300){
                // ---GET
                // content.innerHTML = xhr.response;

                // ---POST  
                const {name,age,gender,songs} = xhr.response;
                content.innerHTML = (`
                                        <ul>
                                            <li>姓名:${name}</li>
                                            <li>年龄:${age}</li>
                                            <li>性别:${gender}</li>
                                            <li>歌曲:${songs}</li>
                                        </ul>
                                    `)
            }
        }
    }

    // 设置发送请求的信息 
    // method
    //      --GET (查询)  请求指定的页面信息，并返回实体主体。
    //          --参数类型 query  key=value ?key1=value1&key2=value2
    //                    params  value1/value2 因为在服务器端设置的是/:id1/:id2
    //      --POST (增加) 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。
    //      --DELETE (删除) 请求服务器删除指定的页面。
    //      --PUT (更新) 从客户端向服务器传送的数据取代指定的文档的内容
    // url 请求的路径


    // 统一设置响应数据的类型以便拿到数据便于解析
    xhr.responseType = 'json'; //不是json类型的会响应一个null
    
    // ---GET

                // 携带query参数 编码格式为  urlencoded
                // xhr.open("GET","http://127.0.0.1:8080/test_get?name=小徐&age=30&gender=男");
                
                // 携带params参数 编码格式为  urlencoded
                // xhr.open("GET","http://127.0.0.1:8080/test_get2/小徐/30/男");

    // ---POST

                xhr.open("POST","http://127.0.0.1:8080/test_post");
                //  参数类型 query  params  body(请求体)  

                // 设置请求头 指定携带的请求体格式 urlencoded
                // xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');

                // 设置请求头 指定携带的请求体格式 json
                xhr.setRequestHeader('content-type','application/json');

                // post在发送请求的时候携带请求体 urlencoded
                // xhr.send("name=小徐&age=30&gender=男");

                // post在发送请求的时候携带请求体 json
                const person = {name:'小徐',age:30,gender:'男'}
                xhr.send(JSON.stringify(person));


    // xhr.send()
}

