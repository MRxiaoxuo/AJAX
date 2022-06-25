const express = require('express');
const app = express();

const cors = require('cors');

// 暂时解决跨域问题  暴露 前端需要测试的页面ajax_01.html 这样就可以共用一台服务器了
// 原因同一主机不可能开两台服务器
app.use(express.static(__dirname+'/src/01'))


// 服务端解决post请求携带的urlencoded编码格式的数据
app.use(express.urlencoded({extended:true}));


// 服务端解决post请求携带的json编码格式的数据
app.use(express.json());

// 使用cors中间件
app.use(cors());


// ---GET
        //  ----query路由规则
        app.get('/test_get',(req,res)=>{
            console.log('test_get被请求了数据是',req.query);
            res.send('我是测试GET请求query参数响应的数据')
        });

        //  ----params路由规则
        app.get('/test_get2/:name/:age/:gender',(req,res)=>{
            console.log('test_get2被请求了数据是',req.params);
            res.send('我是测试GET请求params响应的数据')
        });

        // ----请求关于IE缓存问题
        app.get('/test_ie',(req,res)=>{
            console.log('test_ie被请求了携带的请求体是',req.query);
            const starData = {
                // name:'王心凌',
                // name:'Cindy',
                name:'查美乐',
                age:39,
                gender:'女',
                songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
            }
            res.send(JSON.stringify(starData));
        });

        // ----请求时间与响应时间的问题
        app.get('/test_delay',(req,res)=>{
            console.log('test_delay被请求了携带的请求体是',req.query);
            const starData = {
                // name:'王心凌',
                // name:'Cindy',
                name:'查美乐',
                age:39,
                gender:'女',
                songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
            }
            //设定响应时间的回调 响应时间设定为3s
            setTimeout(()=>{
                res.send(JSON.stringify(starData));
            },3000)
        });

        // ----取消请求的路由设置
        app.get('/test_cancel',(req,res)=>{
            console.log('test_cancel被请求了携带的请求体是');
            const starData = {
                name:'王心凌',
                age:39,
                gender:'女',
                songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
            }
            setTimeout(()=>{
                res.send(JSON.stringify(starData));
            },3000)
        });

        // ---jQuery

                // ---jquery请求的路由 携带的query参数
                app.get('/test_jquery',(req,res)=>{

                // ----jquery请求的路由 携带的params参数
                // app.get('/test_jquery/:name',(req,res)=>{
                    // console.log('test_jquery被请求了',req.query);
                    console.log('test_jquery被请求了',req.params);
                    const starData = {
                        name:'王心凌',
                        age:39,
                        gender:'女',
                        songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
                    };
                    setTimeout(()=>{
                        res.send(JSON.stringify(starData));
                    },3000)
                });


        //---jsonp请求的路由

        app.get('/test_jsonp',(req,res)=>{
            console.log('test_jsonp被请求了');
             const starData = [
                {
                name:'王心凌',
                age:39,
                gender:'女',
                songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
                },
                {
                    name:'胡歌',
                    age:39,
                    gender:'男',
                    TVseries:["《仙剑1》","《琅琊榜》","《苦咖啡》","《猎场》"]
                }
        ]
            // res.send(JSON.stringify(starData));
            console.log(req.query);
            const {callback} = req.query 
            res.send(`${callback}(${JSON.stringify(starData)})`)
        });


        //----cors演示的路由
            app.get('/test_cors',(req,res)=>{
                console.log('test_cors被请求了..');
                const starData = [
                    {
                    name:'王心凌',
                    age:39,
                    gender:'女',
                    songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
                    },
                    {
                        name:'胡歌',
                        age:39,
                        gender:'男',
                        TVseries:["《仙剑1》","《琅琊榜》","《苦咖啡》","《猎场》"]
                    }
                ];

                // res.setHeader('Access-Control-Allow-Origin','*')
                // res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
                // res.setHeader('Access-Control-Expose-Headers','*');

                res.send(JSON.stringify(starData));

            });



// ---PUT
        app.put('/test_put',(req,res)=>{
            console.log('test_cors被请求了..');
            const starData = [
                {
                name:'王心凌',
                age:39,
                gender:'女',
                songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
                },
                {
                    name:'胡歌',
                    age:39,
                    gender:'男',
                    TVseries:["《仙剑1》","《琅琊榜》","《苦咖啡》","《猎场》"]
                }
            ];

           

            // res.setHeader('Access-Control-Allow-Origin','*')
            // // res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
            // res.setHeader('Access-Control-Expose-Headers','*');

            res.send(JSON.stringify(starData));
        });
         // 对于PUT有两个请求 第一个预请求
        app.options('/test_put',(req,res)=>{
            // res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
            // res.setHeader('Access-Control-Expose-Headers','*');
            // res.setHeader('Access-Control-Allow-Methods','*');
            res.send();
        })



// ---POST
        /* app.post('/test_post',(req,res)=>{
            console.log('test_post被请求了携带的请求体是',req.body);
            res.send('我是测试请求POST方法响应的数据')
        }); */

        // 响应post请求 响应json数据
        app.post('/test_post',(req,res)=>{
            console.log('test_post被请求了携带的请求体是',req.body);
            const starData = {
                name:'王心凌',
                age:39,
                gender:'女',
                songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
            }
            res.send(JSON.stringify(starData));
        });


        //响应post请求 jQuery请求的方法
        app.post('/test_post_jquery',(req,res)=>{
            console.log('test_jquery被请求了',req.body);
            const starData = {
                name:'王心凌',
                age:39,
                gender:'女',
                songs:["《爱你》","《睫毛弯弯》","《大眠》","《第一次爱你的人》"]
            };
            res.send(JSON.stringify(starData));
        });




app.listen(8080,()=>{
    console.log('8080端口已开启...');
})