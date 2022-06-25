### AJAX
AJAX :Asynchronous Javascript And XML 

异步的Js  和  XML

通过ajax可以在浏览器中向服务器发送异步请求  最大的优势就是无刷新页面获取数据

不是新的编程语言  而是将现有的语言标准组合在一起使用的新方式

XML简介

可扩展标记语言，被设计用来传输和存储数据，和HTML类似，不同的是HTML中都是
预定义标签，XML中没有预定义标签全都是自定义标签，用来表示一些数据
<student>
    <name>小马</name>
    <age>20</age>
    <gender>男</gender>
</student>
现在已经被JSON格式取代了
{"name":"小马","age":20,"gender":"男"}

AJAX优点:
无刷新与服务器端通信
根据用户事件来无刷新更新部分页面内容

AJAX缺点:
没有浏览历史
存在跨域问题
SEO不友好(ajax请求的数据爬虫爬不到)

---Ajax基本使用

        核心对象  XMLHttpRequest  ajax操作基于该对象完成的
        1.创建一个 XMLHttpRequest 实例对象 xhr
            const xhr = new XMLHttpRequest()
        2.设置请求信息
            xhr.open(method,url)//配置请求
            xhr.setRequestHeader(key,value)//设置请求头信息
        3.发送请求
            xhr.send(body)//get请求不传递参数，只有post请求需要传递参数
        4.接收响应数据
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState===4 && xhr.status ===200){
                    cosnsole.log(xhr.response)
                }
            }

设置请求头  xhr.setRequestHeader(key,value);
获取响应头  xhr.getResponseHeader(key)   xhr.getAllResponseHeaders() 
POST方法设置请求头 :  content-type 
值:application/x-www-form-urlencoded    application/json 

------GET方法 请求参数类性  query  和  params
        query:  key1=value1&key2=value2&key3=value3     服务端路径规则 http://127.0.0.1:8080/pathname   req.query获取请求查询字符串
        params: /value1/value2/value3                   服务端路径规则 http://127.0.0.1:8080/pathname/:key1/:key2/:key3   req.params获取请求参数

****GET方法一般都是查询数据的 参数都是在url中 不安全  且有缓存

------POST方法 请求参数类性 一般都是在请求体中 数据格式分为: 
        urlencoded  key1=value1&key2=value2&key3=value3  
        主要设置请求头 xhr.getResponseHeader('content-type','application/x-www-form-urlencoded')
        json格式    {"key1":value1,"key2":value2,"key3":value3}
        设置请求头   xhr.getResponseHeader('content-type','application/json')

------同时在服务端要注意这两种格式  要想获取到请求体的参数  必须使用express框架的中间件进行解析
        urlencoded  express().use.(express.urlencoded({extended:true}))   req.body 获取请求体参数
        json        express().use(express.json())   req.body 获取请求体参数

****POST方法一般都是添加数据的 参数携带在请求体中  较安全 不可以缓存

------针对响应数据的格式的处理  在服务端响应给前端的数据一般都是json格式的 偶尔会存在字符串格式的
   所以对于前端为了方便接受处理数据需要设置一个统一的响应数据格式   xhr.responseType = 'json' 

------请求异常与超时的API
        xhr.onerror = ()=>{
            //当请求出错的时候启用的回调
        }
        xhr.timeout = 2000 设置允许最长的响应时间为2s
        xhr.ontimeOut = ()=>{
            //当请求事件唱过设置的时间的时候启用的回调
        }

------对于IE浏览器GET方法缓存的问题的处理  多加上一个时间戳属性 使每次请求的参数好像都改了一样
        xhr.open('GET','http://127.0.0.1:8080/pathname?query'+Date.now())

------取消请求的API    xhr.abort()  实质是关闭请求 来得及阻挡发送就阻挡   来不及就关闭接收数据

------避免多次请求的处理
            const btn = document.getElementById('btn);
            let xhr;//提亲声明变量
            let falg;//给xhr的状态追踪标签
            
            btn.onclick = ()=>{

                //每次点击之前 判断状态是否是真 若为真即可取消前一次的请求

                if(flag){
                    xhr.abort();
                }

                xhr = new XMLHttpRequest();

                xhr.onreadystatechange = ()=>{
                    if(xhr.readyState===4 && (xhr.status>=200 && xhr.status<300)){
                        //一旦响应数据接收完毕表示不能取消了 状态为false
                        flag = false;
                        console.log(xhr.response)
                    }
                }

                xhr.responseType = 'json';//指定响应回来的数据格式为json
                xhr.open(''GET','http://127.0.0.1/test_cacel')
                xhr.send();
                flag:true;//刚发出去还没回来的状态为true 表示可以取消
            }
       
------jQuery封装的ajax请求的语法
            <!-- 引入jQuery -->
            <script type="text/javascript" src="./js/jquery.min.js"></script>
            const btn = $("#btn")
            1.【完整版】写法
            btn.click(()=>{
                 $.ajax({
                    url:"http://127.0.0.1:8080/test_jquery",//请求的路径
                    method:"GET",//请求的放阿飞
                    data:{name:"zhun"},//请求携带的参数
                    dataType:"json",//设置响应数据格式
                    timeOut:2000,//允许响应的最长时间
                    sunccess:(result,resultText,xhr)=>{
                        // result  接收回来的数据对象
                        // resultText 响应结果状态 "success"
                        // xhr html中请求需要用的对象

                        //请求响应成功运行的代码
                    },
                    error:(xhr)=>{
                        //请求失败运行的代码
                    }

                })
            })
               
            

            2.【精简版】写法  
            ***携带query参数
           btn.click(()=>{
                $.get("http://127.0.0.1:8080/test_jquery",{name:zhun},(data)=>{

                })
           })
            ***携带params参数
           btn.click(()=>{
                $.get("http://127.0.0.1:8080/test_jquery/zhun",{},(data)=>{

                }."json")//这个是设置响应回来的数据格式
           })

           ***【POST精简版】
           btn.click(()=>{
                $.post("http://127.0.0.1:8080/test_jquery_post",{},(data)=>{

                },"json")
           })


------跨域与同源策略

        同源:相同的协议 、 主机名(IP地址) 、 端口号

        跨域:使用ajax请求数据的时候 以上三者若有一个不同即为跨域

        跨域导致的结果:
            (1)不能共享Cookie、LocalStorage、IndexDB
            (2)不能获取DOM
            (3)AJAX请求不能发送

            例如:在页面 http://127.0.0.1:5500/src/test.html 

                    有一个按钮 <button>点击发送ajax请求</button> 
                    请求的路径为 "http://127.0.0.1:8080/test_ajax"
                    
                    由于前者对应的端口为  5500  后者对应的端口为 8080  即为跨域请求 
                    这时候即使请求发出去了浏览的ajax引擎会阻挡响应数据的传输 前端会报错
                    显示(Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.) 
                    这里其实为解决跨域做了做了说明  缺少 Access-Control-Allow-Origin 响应头 

        目的:言简意赅就是保护用户的隐私信息以防不法分子利用网络的bug来攻击用户的账户  获取账号密码等敏感信息
        例如:一个用户在同一浏览器多次登录同一网站的时候 服务器第一次会给客户端种下一个cookie(代表该账户的id)该用户下次
        登录该网站的时候 浏览器会自动将cookie添加到响应头 从而用户不用输密码即可进入该网站  如果没有同源策略 
        当你点依然使用该浏览器击某陌生连接的时候 (该链接其实是向你登录过的网站发请求)由于有cookie缓存所以不用登录密码对方即可
        进入到你登录过的网站那后果就不堪设想了哦...

------解决同源策略

        JSONP方法解决(只允许GET方法)
        其实该方法只是巧妙的绕过了XMLHttpRequest对象 是程序员自己创建的一种方法
        平时我们用的 img script  style 等允许跨域引用资源
        而script标签可以引用js代码 且src属性其实也是get方法获取数据的一种
        如果后端在设置路由规则的时候和前端达到一致性是可以引获取资源的 
        其实就是前端创建一个函数并携带形参为data(需要的数据)的 而后端就是返回  调用该函数的代码并传递实参(前端想要的数据)
        具体实现如下

        当点击事件触发的时候我们需要获取某数据 操作如下
        btn.onclick = ()={
            //我们可以创建一个script标签节点
            let scriptNode = document.createElement('script');

            //为该节点添加src属性值为向后端发送请求数据的路径 并携带query参数  callback = fn 这个参数后端是可以获取得到的
            scriptNode.src = 'http://127.0.0.1:8080/test_jsonp?callback=fn';
            //添加scriptNode标签到body中
            document.body.appendChild(scriptNode);
            (script标签中数据是后端返回的js代码  类容为   调用创建的函数(实参是后端给的数据))  形如 fn(JSON.stringify(data)) 
            
            
            //我们可以在全局创建一个函数用来接收数据

            window.fn(上述script标签携带的参数的值) = (data)=>{
                console.log(data) data即为我们想要的数据 
            }
        }

        ****jquery封装的JSONP方法
        $("#btn").click(()=>{
             $.getJSON('http://127.0.0.1:8080/test_jsonp?callback=?',{},(data)=>{
                console.log(data);
            })
        })

        【官方cors中间件解决跨域问题】
        //这个其实是后端的事情
        前端不用做任何事 该怎么请求怎么请求 
        后端其实就是在响应头做了事
        如果不使用cors中间件的话 
         这里使用的是node 后端Express模块的的操作

        对于 get 和 post 方法请求数据的时候
        需要添加响应头如下  
            res.setHeader('Access-Control-Allow-Origin','*') //*表示允许任地址向改地址发送请求 都设置该响应头
            //res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');//只允许该地址向服务端发送请求才设置响应头
            res.setHeader('Access-Control-Expose-Headers','*');
        对于PUT方法请求数据的时候
        需要添加响应头如下 
        app.put("/test_put",(req,res)=>{
            res.setHeader('Access-Control-Allow-Origin','*');
            res.setHeader('Access-Control-Expose-Headers','*');
            res.send("后端返回的数据");
        });
        PUT方法比较特殊 会有一个预请求 所以还需要添加预请求路由
        app.options("/test_put",(req,res)=>{
            res.setHeader('Access-Control-Allow-Origin','*')
            res.setHeader('Access-Control-Expose-Headers','*');
            res.send();
        });


        如果后端使用这种操作就太搞事情了  所以就需要引入以个cors中间件
        const  cors = require('cors');

        // 使用cors中间件
        app.use(cors());//使用了该中间件 有需要跨域请求可以直接请求数据

        


        
          

                 






