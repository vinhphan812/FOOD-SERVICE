module.exports = {
	verifyMail: (name, code) => {
		const title = "Vui lòng xác nhận email của bạn!";
		const children = `
          <div class="body">
                    <div class="sayhi">Xin chào ${name}!</div>
                    <div>Vui lòng nhập mã xác minh Email trên Foozie để hoàn tất quá trình xác nhận.</div>
                    <div class="code">${code}</div>
                    <div>* Vui lòng không trả lời email này</div>
               </div>
          `;
		const style = ``;
		return html(title, children, style);
	},
};

function html(title, children, style) {
	return `
          <html>
               <head>
                    <style>
                    * {
                         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    }
               
                    body {
                         margin: 0;
                    }
               
                    .header,
                    .footer {
                         background-color: #223462;
                         width: auto;
                         height: 30px;
                         display: flex;
                         align-items: center;
                         padding: 1rem;
                    }
               
                    .logo {
                         font-size: 32px;
                         font-weight: bold;
                    }
               
                    .logo .first {
                         color: #58abcd;
                    }
               
                    .logo .last {
                         color: #fff;
                    }
               
                    .main {
                         padding: 1rem;
                         background-color: #ddd;
                    }
               
                    .title {
                         background-color: #223462;
                         color: #fff;
                         padding: 24px;
                         font-size: 24px;
                         text-align: center;
                    }
               
                    .body {
                         background-color: #fff;
                         padding: 24px;
                    }
               
                    .body div.sayhi {
                         font-weight: bold;
                    }
               
                    .code {
                         font-size: 24px;
                         width: fit-content;
                         margin: 15px auto 5px auto;
                         padding: 10px 20px;
                         background-color: #edf2ff;
                         color: #223462;
                    }
                    ${style}
                    </style>
               </head>
               <body>
                    <div class="header">
                         <div class="logo">
                              <span class="first">Foo</span><span class="last">zie</span>
                         </div>
                    </div>
                    <div class="main">
                         <div class="title">${title}</div>
                         ${children}
                    </div>
                    <div class="footer"></div>
               </body>
          </html>`;
}
