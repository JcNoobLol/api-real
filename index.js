let express = require("express");  
let app = express();
let path = require("path"); 
let multer = require("multer");

const uuid = require('uuid');
const superagent = require("superagent");
const recentFiles = [];
const fileUpload = require('express-fileupload');
let year = "2024";
//this code upload file uh stuf like that
const storage = multer.diskStorage({
  destination: `./${year}`,
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null,fileName);
  }
});

const upload = multer({ storage: storage });
app.get("/",(req,res) => {
  res.send( `

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JcBlak</title>
</head>
<body>
<br><BR> <br> 
<section class="hidden">
  <img src="https://files.jcmainclr.xyz/uploads/main.png" >
  <p>Hello uh this site is just a development or making some test stuff yeah</p>
  <a href="/api"><img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/json.png" width="20">Api</a> 
  <a href="https://jc-blakman-rel.oki2.repl.co/api/v1/upload-files/list"><img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/files.png" width="18"> File List </a>
   <a href="/projects"><img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/projects.png" width="20">Projects</a>
</section>
</body>
<style>

body {
font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, sans-serif;
font-size: 30px;
background-color: #111;
color: #333;
}
section {
color: #FFF;
border: 3px solid #fff;
padding: 20px;
text-align: center;
}
.hidden{
opacity: 0;
transition: all 1s;
filter: blur(10px);
transform: translateY(-100%);
}
.show{
opacity: 1;
filter: blur(0);
transform: translateY(0);
}
a{
color: #fff;
cursor: pointer;
text-decoration: none;
transition: ease-in 0.3s;
}
a:hover{color: cornflowerblue;}
</style>
<script>
let oberv = new IntersectionObserver((entires) => {
    entires.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show')
        }
    })
})
let hidden = document.querySelectorAll('.hidden')
hidden.forEach((el) =>  oberv.observe(el))
</script>
  `)
})
app.get("/projects",(req,res) => {
  res.send(`
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JcBlak -Projects</title>
    <meta name="og:title" content="Real Project">
    <meta   content="Yeah"  property="og:description">
    <meta name="og:image" content="https://files.jcmainclr.xyz/uploads/main.png">
</head>
<body>
    <h1 class="rel">JcBlak Projects</h1>
    <div class="pro">
        <h1>Main Website</h1> 
        <a href="https://go.jcmainclr.xyz/"  target="_blank">Feel free to visit it</a>
        <p>I make this site cause for fun yeah cause am board </p>
        <img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/pro-1.PNG" alt="Main Site" width="500">
    </div>
    <div class="pro">
     <h1>My friend site yeah</h1>
     <a href="https://go.jcmainclr.xyz/kyle"  target="_blank">Feel free to visit it</a>
     <p>I make this site cause  uh just for fun i guess yeah </p>
     <img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/pro-2.PNG" alt="Real" width="500">
    </div>
    <div class="pro">
     <h1>My 2nd Friend Site</h1>
     <p>I made this website because a friend of mine started a Discord server, and yeah. .</p>
     <a href="https://epic-gamers.oki2.repl.co/"  target="_blank">Feel free to visit it</a><br>
     <img src="https://main.jcmainclr.xyz/new-asset/epic-gamers-site.PNG" alt="Real site" width="500"><br>
    </div>
    <div class="pro">
        <h1>And Lastly my shitty website</h1>
        <p>I make this site for dev stuff like uhh uploading image or api and etc yeah</p>
        <img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/pro-3.PNG" alt="Rel" width="500"><br>
       <a href="https://jc-blakman-rel.oki2.repl.co/" target="_blank">Real.</a>
    </div>
</body> 
<style>
    .rel{align-items: center;text-align: center;}
    body{
        background-color: #111;
        color: #FFF;
        font-family: 'Roboto',sans-serif;
    }
    .pro {


    opacity: 0;
    transition: all 2s;
    transform: translateY(-100%);
}
.show{opacity: 1; transform: translateY(0);}
.pro {
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 1rem;
    padding: 1rem;
    text-align: center;
}

</style>
<script>
    let oberv = new IntersectionObserver((entires) => {
        entires.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }else{
                entry.target.classList.remove('show')
            }
        })
    })
    let hidden = document.querySelectorAll('.pro')
    hidden.forEach((el) =>  oberv.observe(el))
    </script>
  `)
})
app.get("/api/v2/fb-download_vid",(req,res) => {
  const { facebook } = require("fy-downloader");
  let url = req.query.url
facebook(url, (err, data) => {
  if(err != null){
 res.json({err: err})
  } else {
    res.json({data: data})
  }
});

})
app.post('/api/v1/upload',   upload.single('file'),async (req, res) => {

    const fileName = req.file.originalname;
    var url = 'https://api.short.io/links';
var data = {
    originalURL: `https://jc-blakman-rel.oki2.repl.co/wp-content/2024/all_files/${fileName}`,
    domain: 'go.jcmainclr.xyz'
};
var config = {
    headers: {
        'Authorization': 'sk_d4kDWp9pshrjwAGf',
        'Content-Type': 'application/json'
    }
};

  if (!req.file) {
    return res.status(400).send('No file uploaded.');

  }
  axios.post(url, data, config)
    .then(function(response) {
        res.send(`Heres your new file <a href='/wp-content/2024/all_files/${fileName}'>click me to redirect to the file.</a><br><br>
        <p> short link: ${response.data.shortURL} </p>

         `);
    })

    recentFiles.unshift({
      id: uuid.v4(),
      name: req.file.filename,
      path: req.file.path,
   });
});
app.get('/api/v2/refile', (req, res) => {
  res.json(recentFiles);
});
app.get("/loptop-specs",(req,res) => {

 res.send(`
 <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loptop specs 💀</title>
    <script src="https://kit.fontawesome.com/1dba893193.js" crossorigin="anonymous"></script>
</head>

<body>
    <section class="hidden">
       <h1>My Loptop specs:  </h1>
       <h1>Main</h1>
       <img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/IMG20231008093710.jpg" width="400">
       <p> <i class="fa-solid fa-laptop fa-fade"></i>System Model: Aspire A514-53</p>
       <p><i class="fa-solid fa-microchip fa-fade"></i> CPU: Intel(R) Core(Tm) i3-100G1 CPU @ 1.20GHz,1190 Mhz,2Core(s)</p>
        <p><i class="fa-solid fa-memory fa-fade"></i></i> RAM: 4GB (Upgrading 8gb Soon <img src='https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/ok.png' width="20">)</p>
        <p><i class="fa-solid fa-hard-drive"></i> Storage: 1TB HHD  128 SSD</p>
        <p><i class="fa-solid fa-tv fa-flip"></i> Screen: 60HZ</p>
    </section>
    <section class="hidden">
        <h1>real hard drive shot</h1>
        <img src="https://jc-blakman-rel.oki2.repl.co/wp-content/2023/all_files/IMG20231011100628.jpg" width="500">
        </section>
</body>
<script>
    let oberv = new IntersectionObserver((entires) => {
        entires.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }else{
                entry.target.classList.remove('show')
            }
        })
    })
    let hidden = document.querySelectorAll('.hidden')
    hidden.forEach((el) =>  oberv.observe(el))
</script>
<style>
body{
    background-color: #131316;
    color: #fff;
    font-family: 'Roboto',sans-serif;
    padding: 0;
    margin: 0;
}
section{
    display: grid;
    place-items: center;
    align-items: center;
    min-height: 100vh;
}
.hidden{
    opacity: 0;
   transition: all 5s;
   filter: blur(5px);
   transform:  translateY(-100%)
}
.show{
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
}
</style>

 `)
})
//special
const blog = multer.diskStorage({
  destination: `./blog`,
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null,fileName);
  }
});
const monke = multer({ storage: blog });
app.post('/api/special/blog-post',   monke.single('file'),async (req, res) => {
  const fil = req.file.originalname;

if (!req.file) {
  return res.status(400).send('No file uploaded.');
}

res.send(`Heres your new file <a href='/cdn/blog/${fil}'>click me to redirect to the file.</a><br><br>
<p>THIS API IS KINDA SPECIAL YEA</p>
`);
});
app.use(`/cdn/blog/`, express.static(`blog`));
//end
app.get("/rel/wat/fileuploading",(req,res) =>{
 res.sendfile(path.join(__dirname,'./file_interface.html'))
})

let directoryPath = './2024'
app.use(express.static(directoryPath));
app.get('/api/v1/upload-files/list',(req,res) => {    
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading directory');
    }

    const fileLinks = files.map((file) => {
      const fileUrl = path.join( file);
      return `<a target="_blank" href="/wp-content/${year}/all_files/${fileUrl}">${file}</a>`;

    });

    res.send(fileLinks.join('<br>'));
  });
})
//end
app.use(`/wp-content/2023/all_files`, express.static(`2023`));
app.use(`/wp-content/${year}/all_files`, express.static(`${year}`));
app.listen(3000); console.log("hi niga hahahhhhhahahaha -allen")

app.get("/")
//discord status or cmd ye
app.get('/api/v1/discord-status/:userId', async (req, res) => {
const { userId } = req.params;
const guild = client.guilds.cache.first(); 


if (!guild) {
  res.status(404).json({ error: 'Bot is not in any guild' });
  return;
}

const member = guild.members.cache.get(userId);

if (!member) {
  res.status(404).json({ error: 'User not found' });
  return;
}

const presence = member.presence;
const status = presence.status;
const activity = presence.activities.find(activity => activity.type !== 'CUSTOM_STATUS');

 res.json({
  user: member.user.username,
  playing: status,
  playing:  activity ? activity.name : 'None' ,
  online: status,
  description: activity ? activity.state : 'None' ,

 })
});

app.get("/token_h483h439hkylemonkeooaa/",(req,res) => {
  res.json({content:` Kyle Ipon cash in status:

8/29/23: 200 Pesos cash in 12:05 pm
8/29/23: -200 Pesos Lazada (Glass stuff/ price: 173.50) 6:30 pm total :27 pesos
9/2/23: Cash in 100 Pesos Location: 7/11 (REF ID: 0EA868D4879D) 5:38pm
9/3/23: -138 Petot (SPOTIFTY PREMIUM) 
BALANCE: 0
STATUS: UPDATED
Goal: https://shopee.ph/J1-High-OG-University-blue-Retro-GS-Basketball-Vintage-Shoes-OEM-Quality-with-box-i.951540378.23974808449?xptdk=ed6adeff-cb39-41ad-9e8c-a53431d326e9
price: ₱1,899



  `})
})
app.use(fileUpload());
app.post("/api/v2/discord-cdn/fileuploading",async(req,res) => {
  const file = req.files.file;
   let url = req.files.url
     // Find the Discord channel where you want to send the file
     const channel = client.channels.cache.get('1130033235611619408');
     if (!channel) return res.status(404).send('database  not found.');
     const attachment = new MessageAttachment(file.data,file.name);
     channel.send(attachment)
       .then((rel) => {
        const fileURL = rel.attachments.first().url;
         res.status(200).send(`
         <head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Done!</title> 
     </head>
     <body>
         <h2>
               <a href="${fileURL}" target="_blank">Click me to get your file link</a>

         </h2>
         <h2> link ${fileURL}</h2>
     </body>
     <style>
         body{
         background-color: #000;
         color: #fff;
         font-family: 'Roboto',sans-serif;
         }
         h2{
             font-size: 30px;
         }
         a{
             color: aliceblue;transition: ease-in 0.3s;
         }
         a:hover{
             color:darkgoldenrod;
         }
     </style>
         `)
       })
       .catch(error => {
         console.error(error);
         res.status(500).send('An error occurred while sending the file.');
       });
   });

//
   //app.get("/rel/wat/fileuploading/2",(req,res) => {
 // res.send(`
 // <head>
 // <title>Blak man uploading pro file niga</title>
 // <meta name="viewport" content="width=device-width, initial-scale=1.0">
 //</head>
//<body>
//<h1>File Uploading v2 </h1>
//<form action="/api/v2/discord-cdn/fileuploading" method="POST" enctype="multipart/form-data">
 // <input style="font-size: 30px; border: none; border-radius: 5px; "  type="file" name="file" required><br><br>
 // <button class="btn" type="submit">Upload</button>
//</form>
//</body>
//<style>
  //body{
  //    background-color: #000;
      //color: #fff;
   //   font-family: 'Roboto',sans-serif;
  //}
//  .btn{
      //padding: 4px 8px;
 //color: var(--fg);
  //font-weight: 500;
 // transition: all .2s ease;
 // cursor: pointer;
 // background-color: #161923;
  //border: none;
 // font-size: 30px;
//  border-radius: 5px;
 // }.btn:hover{background-color: #f40552;}
//</style>


  //`)
//})

app.get("/docs/api",(req,res) => {
  res.send("soon")
})
////////////////////-----------------------------------------/.///////////////
app.get("/client-side.js",(req,res) => {
  res.sendfile(path.join(__dirname,'./client-side.js'))
})
app.get("/file-pass",(req,res) => {

})
app.get("/api/v1/forum_notification",(req,res) => {
  res.send("Gugu")
})
app.get("/api/",(req,res) => {
  res.send(`
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Api</title>
    <link rel="icon" href="https://cdn.discordapp.com/avatars/893846216734031872/91464f7e2686e83da3c8f6fe19de4368.png?size=4096">
</head>
<body>
    <br><BR>    <br><BR>    <br><BR>    
        <div class="main">
            <h1>API LIST</h1>
            <a href="./api/v1/meme">Meme Api</a><br><br>
            <a href="./api/v2/fb-download_vid?url=YOUR_URL">Fb downloader video api </a><br><br>
            <a href="#">Youtube downloader api (soon)</a><br><br>
            <a href="./api/v1/discord-status/YOUR_USER_ID">Discord Status(Still buggy)</a>
        </div>
</body>
<style>
    body{
        background-color: #000;
        color: #FFF;
        font-family: 'Ubantu',sans-serif;
    }
    .main{
        align-items: center;
        text-align: center;
        opacity: 0;
        transition: all 2s;
        transform: translateY(-100%);
    }
    .show{
        opacity: 1;
        transform: translateY(0);
    }
    a{
        color:crimson;
        font-size: 30px;
        text-decoration:solid;
    }
    a:hover{
        color: cadetblue;
    }
</style>
<script>
    let oberv = new IntersectionObserver((entires) => {
        entires.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }else{
                entry.target.classList.remove('show')
            }
        })
    })
    let hidden = document.querySelectorAll('.main')
    hidden.forEach((el) =>  oberv.observe(el))
</script>
  `)
} )
app.get("/rel/wat/fileuploading/3",(req,res) => {
  res.send(`
  <html lang="en">
 <head>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>Uploading File V3</title>
 </head>
 <body>
    <h2 style="font-size: 30px;">Uploading v3</h2>
   <form id="upload-form">
     <input id="file-field" type="file" class="btn"/><br><BR>
     <button class="btn">Upload</button>
   </form>
   <div id='url'></div>
   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
   <script src="/client-side.js"></script>
 </body>
</html>
<style>
   body{
       background-color: #000;
       color: #fff;
       font-family: 'Ubantu',sans-serif;
   }
   .btn{
       color: #fff;
       border-radius: 5px;
       background-color: #000;border: 3px solid #fff;
       font-size: 30px;
       cursor: pointer;
       }
       .btn:hover{background-color: blue;}
       a{color: darkmagenta; text-decoration: none;}a:hover{color: darkolivegreen;}
</style>

  `)

})

////////////////////-----------------------------------------/.///////////////end
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
  app.use(passwordProtected)


//password stuff on new upload stuff
function passwordProtected(req, res, next) {
  if(!req.get('Authorization')){
    var err = new Error('Not Authenticated!')
    res.status(401).set('WWW-Authenticate', 'Basic')
    next()
}
else{
    var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
    .toString()
    .split(':')

    var username = credentials[0]
    var password = credentials[1]
    if(!(username === 'jacreal' && password === 'james123')){
        var err = new Error('Not Authenticated!')
        res.status(401).set('WWW-Authenticate', 'Basic')
        next(err)} 
    res.status(200)
    next()
}
}
app.get("/api/upload-img/type-blog-post",(req,res) => {
 res.send(`
 <head>
  <title>Blog post</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<h1>Upload a blog post imager</h1>
<form action="/api/special/blog-post" method="POST" enctype="multipart/form-data">
  <input style="font-size: 30px; border: none; border-radius: 5px; "  type="file" name="file" required><br><br>
  <button class="btn" type="submit">Upload</button>
</form>
</body>
<style>
  body{
      background-color: #000;
      color: #fff;
      font-family: 'Roboto',sans-serif;
  }
  .btn{
      padding: 4px 8px;
  color: var(--fg);
  font-weight: 500;
  transition: all .2s ease;
  cursor: pointer;
  background-color: #161923;
  border: none;
  font-size: 30px;
  border-radius: 5px;
  }.btn:hover{background-color: #f40552;}
</style>

 `)
})
app.get("/login",(req,res) => {
  res.send(`<head>
  <title>real </title>
  <link rel="icon" href="https://cdn.discordapp.com/avatars/893846216734031872/91464f7e2686e83da3c8f6fe19de4368.png?size=4096">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>site maintain</h1>
  <div class="main">
  <h1>neocities.org - jc-stuff.neocities.org</h1> <a target="_blank" href="https://neocities.org/site/jc-stuff">Login</a> <a  target="_blank" href="https://jc-stuff.neocities.org/">visit</a>
</div>
<p>more stuff on this shit page</p>
</body>
<style>
  body{
      background-color: #111;
      color: #fff;
      font-family: 'Roboto',sans-serif;
  }
  .main{border: 3px solid #DDD; width: 500px;}
  .main a{color: beige;}
  .main a:hover{color:chocolate;}
</style>`)
})
app.get("/api/special/post",(req,res) => {
  res.sendfile(path.join(__dirname,'./post.html'))
})

client.login(token)

