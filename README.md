<!doctype html>
<html lang="pt">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Emanuel AI — V3</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#070b16;color:#fff;font-family:Arial,sans-serif}
button,input,textarea{font:inherit}
button{touch-action:manipulation}
.app{max-width:430px;margin:auto;min-height:100vh;background:linear-gradient(180deg,#080d1b,#0b1020);display:flex;flex-direction:column;box-shadow:0 0 50px #0008}
header{padding:18px 16px 12px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:21px}
.dot{width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,#2f7cff,#7b42ff);display:grid;place-items:center;font-size:21px}
.ai{color:#667cff}
.menu{border:0;background:transparent;color:#aab2c7;font-size:24px}
.hero{text-align:center;padding:34px 20px 20px}
.bot{width:94px;height:94px;margin:auto;border-radius:30px;background:radial-gradient(circle,#438cff,#3420a8);display:grid;place-items:center;font-size:45px;box-shadow:0 0 35px #365eff88}
h1{font-size:28px;margin:18px 0 8px}
.hero p{color:#aab2c7;margin:0}
.suggestions{padding:10px 16px;display:grid;gap:10px}
.suggestion{border:1px solid #202a43;background:#10182b;color:#e9edff;border-radius:14px;padding:14px;text-align:left;cursor:pointer}
.chat{flex:1;min-height:0;padding:18px 16px;display:none;overflow:auto}
.msg{max-width:84%;padding:12px 14px;border-radius:16px;margin:10px 0;line-height:1.45;white-space:pre-wrap}
.user{margin-left:auto;background:#5b45e8}
.botmsg{background:#141e32;color:#e5eaff;border:1px solid #202d49}
.typing{opacity:.7;font-style:italic}
.spacer{flex:1}
.input{padding:12px 14px;display:flex;gap:8px;border-top:1px solid #182137;background:#090e1b}
.input input{flex:1;background:#121a2c;border:1px solid #26324d;border-radius:15px;color:white;padding:14px;outline:none}
.send{width:50px;border:0;border-radius:15px;background:linear-gradient(135deg,#3d72ff,#713cff);color:#fff;font-size:20px}
nav{display:flex;justify-content:space-around;padding:10px 8px 16px;border-top:1px solid #182137;color:#8490aa;font-size:12px}
nav div{cursor:pointer;text-align:center}
nav div:first-child{color:#5d7cff}
.toast{position:fixed;left:50%;bottom:78px;transform:translateX(-50%);background:#17213a;border:1px solid #2b3857;color:#fff;padding:10px 14px;border-radius:12px;font-size:13px;display:none;z-index:5}
.badges{display:flex;justify-content:center;gap:7px;flex-wrap:wrap;margin:14px 0}
.badge{font-size:11px;color:#b9c5e5;background:#111b31;border:1px solid #263553;padding:6px 9px;border-radius:999px}
.quick{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:4px 16px 12px}
.quick button{border:1px solid #202a43;background:#0f1729;color:#dce5ff;border-radius:13px;padding:11px;text-align:left}
.msg-actions{display:flex;gap:6px;margin-top:8px}
.msg-actions button{border:1px solid #293756;background:#0f1729;color:#98a7c8;border-radius:8px;padding:4px 7px;font-size:11px}
.composer-tools{display:flex;gap:6px;padding:0 2px 8px}
.toolbtn{border:1px solid #26324d;background:#10182b;color:#aebbe0;border-radius:10px;padding:7px 9px;font-size:12px}
.status{font-size:11px;color:#7f8cab;text-align:center;padding:4px 0 0}
.api-panel{display:none;padding:12px 16px;background:#0b1221;border-top:1px solid #182137}
.api-panel input{width:100%;background:#121a2c;border:1px solid #26324d;color:white;border-radius:10px;padding:10px;margin:5px 0}
.api-panel button{border:0;border-radius:10px;padding:9px 12px;background:#536cff;color:white}
@media(max-width:360px){.quick{grid-template-columns:1fr}}
</style>
</head>
<body>

<div class="app">

<header>
<div class="logo">
<div class="dot">🤖</div>
Emanuel <span class="ai">AI</span>
</div>
<button class="menu" id="menu">⋮</button>
</header>

<section class="hero" id="hero">
<div class="bot">🤖</div>
<h1>Olá! Eu sou o <span class="ai">Emanuel AI</span>.</h1>
<p>Uma mente digital para conversar, aprender, criar e resolver problemas.</p>

<div class="badges">
<span class="badge">⚡ Respostas rápidas</span>
<span class="badge">🧠 Ideias</span>
<span class="badge">📚 Estudos</span>
<span class="badge">✍️ Escrita</span>
</div>
</section>

<div class="suggestions" id="suggestions">
<button class="suggestion">🎓 Explica um tema de matemática</button>
<button class="suggestion">💼 Dá ideias de negócios online</button>
<button class="suggestion">✍️ Ajuda-me a escrever um texto</button>
<button class="suggestion">💡 Dá-me uma ideia criativa</button>
</div>

<div class="quick" id="quick">
<button data-prompt="Explica-me este assunto de forma simples e com exemplos">📚 Explicar</button>
<button data-prompt="Dá-me 10 ideias criativas para um projeto">💡 Ideias</button>
<button data-prompt="Ajuda-me a criar um plano passo a passo">🚀 Criar plano</button>
<button data-prompt="Faz-me perguntas para eu aprender melhor">🎯 Estudar</button>
</div>

<div class="chat" id="chat"></div>
<div class="spacer"></div>

<div class="input">
<div style="flex:1">

<div class="composer-tools">
<button class="toolbtn" id="clearBtn">🗑 Limpar</button>
<button class="toolbtn" id="apiBtn">⚙️ IA real</button>
</div>

<input id="input" placeholder="Pergunte qualquer coisa..." autocomplete="off">

<div class="status" id="status">Modo protótipo inteligente</div>

</div>

<button class="send" id="send">➤</button>
</div>

<div class="api-panel" id="apiPanel">
<div style="font-size:12px;color:#aab2c7">
Endpoint da IA
</div>

<input id="endpoint" placeholder="https://seu-servidor.com/api/chat">

<button id="saveApi">Guardar conexão</button>
</div>

<nav>
<div data-tab="chat">💬<br>Chat</div>
<div data-tab="history">◷<br>Histórico</div>
<div data-tab="tools">▦<br>Ferramentas</div>
<div data-tab="profile">◯<br>Perfil</div>
</nav>

</div>

<div class="toast" id="toast"></div>

<script>

const input=document.getElementById('input');
const send=document.getElementById('send');
const chat=document.getElementById('chat');
const hero=document.getElementById('hero');
const suggestions=document.getElementById('suggestions');
const quick=document.getElementById('quick');
const toast=document.getElementById('toast');
const status=document.getElementById('status');
const apiPanel=document.getElementById('apiPanel');

let messages=JSON.parse(
localStorage.getItem('emanuel_ai_chat_v3')||'[]'
);

let endpoint=localStorage.getItem('emanuel_ai_endpoint')||'';

function escapeHtml(s){
return s.replace(/[&<>"']/g,c=>({
'&':'&amp;',
'<':'&lt;',
'>':'&gt;',
'"':'&quot;',
"'":'&#39;'
}[c]));
}

function save(){
localStorage.setItem(
'emanuel_ai_chat_v3',
JSON.stringify(messages)
);
}

function showToast(t){
toast.textContent=t;
toast.style.display='block';

clearTimeout(showToast.t);

showToast.t=setTimeout(()=>{
toast.style.display='none';
},1800);
}

function openChat(){
hero.style.display='none';
suggestions.style.display='none';
quick.style.display='none';
chat.style.display='block';
render();
}

function copyText(text){
navigator.clipboard?.writeText(text)
.then(()=>showToast('Resposta copiada ✓'))
.catch(()=>showToast('Não foi possível copiar'));
}

function render(){

chat.innerHTML='';

messages.forEach((m,i)=>{

const box=document.createElement('div');

box.className=
'msg '+(m.role==='user'?'user':'botmsg');

box.innerHTML=
escapeHtml(m.text).replace(/\n/g,'<br>');

if(m.role==='bot'){

const actions=document.createElement('div');

actions.className='msg-actions';

actions.innerHTML=
'<button>📋 Copiar</button><button>👍</button><button>👎</button>';

actions.children[0].onclick=
()=>copyText(m.text);

actions.children[1].onclick=
()=>showToast('Obrigado pelo feedback 👍');

actions.children[2].onclick=
()=>showToast('Feedback registado');

box.appendChild(actions);
}

chat.appendChild(box);

});

chat.scrollTop=chat.scrollHeight;
}

function localAnswer(text){

const t=text.toLowerCase();

if(
t.includes('matemática')||
t.includes('matematica')||
t.includes('conta')||
t.includes('equação')
)
return 'Claro. Envia o exercício completo e eu posso explicar passo a passo, mostrando como chegar à resposta.';

if(
t.includes('negócio')||
t.includes('negocio')||
t.includes('dinheiro')||
t.includes('empreender')
)
return 'Vamos pensar como empreendedores. Posso gerar ideias, comparar opções, montar um plano, calcular custos e criar estratégias de vendas.';

if(
t.includes('escrever')||
t.includes('texto')||
t.includes('carta')||
t.includes('livro')
)
return 'Posso ajudar a criar, melhorar, resumir ou organizar textos. Diz-me o objetivo, o público e o estilo que queres.';

if(
t.includes('estudar')||
t.includes('aula')||
t.includes('escola')
)
return 'Vamos estudar juntos. Posso explicar o tema, criar uma aula, fazer perguntas, exercícios e corrigir as respostas.';

if(t.includes('ideia'))
return 'Vamos abrir o laboratório de ideias 💡. Posso criar ideias para negócios, tecnologia, conteúdo, estudos e projetos criativos.';

if(
t.includes('olá')||
t.includes('ola')||
t.includes('oi')
)
return 'Olá! 👋 Sou o Emanuel AI. Pergunta-me o que quiseres.';

return 'Estou pronto para ajudar. Faz a tua pergunta e vou tentar responder da melhor forma possível.';
}

async function aiAnswer(text){

if(!endpoint)
return localAnswer(text);

try{

const r=await fetch(endpoint,{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
message:text,
messages:messages
})
});

if(!r.ok)
throw new Error('HTTP '+r.status);

const data=await r.json();

return data.reply||
data.message||
data.output||
'A IA não devolveu uma resposta válida.';

}catch(e){

showToast('Falha na conexão — usando modo local');

return localAnswer(text);

}

}async function talk(text){
  text=text.trim();
  if(!text)return;

  openChat();

  messages.push({role:'user',text});
  save();
  render();

  input.value='';

  const typing=document.createElement('div');
  typing.className='msg botmsg typing';
  typing.textContent='Emanuel AI está a pensar...';

  chat.appendChild(typing);
  chat.scrollTop=chat.scrollHeight;

  send.disabled=true;
  status.textContent='A preparar resposta...';

  const reply=await aiAnswer(text);

  typing.remove();

  messages.push({role:'bot',text:reply});
  save();
  render();

  send.disabled=false;
  status.textContent=endpoint?'IA real conectada':'Modo protótipo inteligente';
}

send.onclick=()=>{
  talk(input.value);
};

input.onkeydown=e=>{
  if(e.key==='Enter'&&!e.shiftKey){
    e.preventDefault();
    talk(input.value);
  }
};

document.querySelectorAll('.suggestion').forEach(b=>{
  b.onclick=()=>{
    talk(b.textContent);
  };
});

document.querySelectorAll('#quick button').forEach(b=>{
  b.onclick=()=>{
    talk(b.dataset.prompt);
  };
});

document.getElementById('clearBtn').onclick=()=>{
  if(confirm('Limpar todo o histórico deste aparelho?')){
    messages=[];
    save();
    location.reload();
  }
};

document.getElementById('apiBtn').onclick=()=>{
  apiPanel.style.display=
    apiPanel.style.display==='block'?'none':'block';

  document.getElementById('endpoint').value=endpoint;
};

document.getElementById('saveApi').onclick=()=>{
  endpoint=document.getElementById('endpoint').value.trim();

  localStorage.setItem(
    'emanuel_ai_endpoint',
    endpoint
  );

  apiPanel.style.display='none';

  status.textContent=
    endpoint?'IA real configurada':'Modo protótipo inteligente';

  showToast(
    endpoint?'Conexão guardada ✓':'Modo local ativado'
  );
};

document.querySelectorAll('nav div').forEach(tab=>{
  tab.onclick=()=>{
    const name=tab.dataset.tab;

    if(name==='chat'){
      openChat();
      showToast('Chat aberto');
      return;
    }

    if(name==='history'){
      openChat();
      showToast(
        messages.length
        ?`Histórico: ${messages.length} mensagens`
        :'Ainda não há histórico'
      );
      return;
    }

    if(name==='tools'){
      showToast('Ferramentas inteligentes em construção 🚀');
      return;
    }

    if(name==='profile'){
      showToast('Perfil: Emanuel AI');
      return;
    }
  };
});

document.getElementById('menu').onclick=()=>{
  if(confirm('Limpar o histórico desta versão?')){
    messages=[];
    save();
    location.reload();
  }
};

if(messages.length){
  openChat();
}

</script>

</body>
</html>
