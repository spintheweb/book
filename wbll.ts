/**
 * Spin the Web WBLL - Webbabse Layout Language
 * 
 * Given a text layout, tokenize it (lex it), the tokenized layout is then ready to be rendered.
 * Rendering is session specific, first all placeholders are replaced then content specific renderings are applied.
 * 
 * Language: TypeScript for Deno
 * 
 * MIT License. Copyright (c) 2024 Giancarlo Trevisan
**/
import { STWSession } from "../stwComponents/stwSession.ts";
import { wbpl } from "../stwComponents/wbpl.ts";

const SYNTAX: RegExp = new RegExp([
	/(\\[aAs])(?:\('([^]*?)'\))/,
	/(\\[rnt])(?:\('([^]*?)'\))?/,
	/(?:([aAbo]))(?:\('([^]*?)'\))?((<|>|p(\('[^]*?'\))?)*)/,
	/(?:([cefhilLmruwxyz]))(?:\('([^]*?)'\))?/,
	/(?:([dDnsSvVk]))(?:\('([^]*?)'\))/,
	/(?:([jJtT]))(?:\('([^]*?)'\))/,
	/\/\/.*$/,
	/\/\*[^]*(\*\/)?/,
	/([<>])/,
	/(?<error>[\S])/ // Anything else is an error
].map(r => r.source).join('|'), "gmu");

export enum ACTIONS {
	stwnone = 0, stwinsert = 1, stwupdate = 2, stwdelete = 4, stwsearch = 8, stwfilter = 16, stwsubmit = 32, stwlogon = 64, stwlogoff = 128, stwpwdreset = 256, stwany = ~0
};

class STWToken {
	symbol: string; // Symbol indicates what HTML tag the token maps to, it'is a mnemonic, e.g., `a` for anchor/link, `b` for button, `c` for checkbox, `r` for radio...
	args: string[] = []; // If you think of symbols as mapping functions, these are it's arguments
	params: STWToken[] = []; // Only certain symbols (`a`, `b` and `o`) have params, they rappresent querystring parameters
	attrs: Map<string, string> = new Map(); // Attributes are HTML attributes, e.g., `name`, `value`, `type`, `href`, etc. They are used to build the HTML tag
	text?: STWToken; // Only `a`, `b` and `t` symbols have text, which is the content of the HTML tag, e.g., the text inside an anchor or a button

	public constructor(symbol: string, args?: string[], params?: STWToken[], attrs?: Map<string, string>, text?: STWToken) {
		this.symbol = symbol;
		if (args) this.args = args;
		if (params) this.params = params;
		if (attrs) this.attrs = new Map(attrs);
		this.text = text;
	}
}

/**
 *  @param wbll
 *  @param settings
 *  @param render
 */
export class STWLayout {
	private _wbll: string;
	private tokens: STWToken[] = [];
	public groupAttributes: string = ""; // Holds attributes from the \A token
	public blockAttributes: string = ""; // Holds attributes from a pre-flight \a token
	private _acts: ACTIONS = ACTIONS.stwnone; // Indicates how the layout interacts
	private static tokenHandlers: Map<string, (token: STWToken, inline: boolean) => string>;

	private _render?: (req: Request, session: STWSession, fields: string[], ph: Map<string, string>, wbpl: (text: string, ph: Map<string, string>) => string) => string;

	settings: Map<string, string> = new Map([
		["rows", "25"],
		["mode", "month"],
		["disabled", "false"],
	]);

	public constructor(wbll: string) {
		if (!STWLayout.tokenHandlers)
			STWLayout.tokenHandlers = this.initializeHandlers();

		this._wbll = wbll;
		this._lex();
	}

	public handleAction(action: string): string[] | undefined {
		return this.tokens.find(token => token.symbol === "b" && token.args[1] + token.args[2] === action)?.args;
	}

	// Checks for syntax errors and tokenizes the layout
	private _lex(): void {
		this.tokens = [];
		this._render = undefined;

		for (const expression of this._wbll.matchAll(SYNTAX)) {
			if (expression.groups?.error !== undefined)
				throw new SyntaxError(expression.input.slice(0, expression.index) + ' ⋙' + expression.input.slice(expression.index));;

			const pattern = expression.filter((value, i) => (value !== undefined && i));

			if (pattern[0]) {
				const token = new STWToken(pattern[0]);

				if (token.symbol[0] === '\\' && 'aAs'.includes(token.symbol[1])) { // \a, \A, \s
					const attributesString = pattern[1] || '';
					const attrRegex = /(@?@?@?[a-zA-Z0-9-_]+)(?:=(["'])([^]*?)\2)?/gmu;
					let lastIndex = 0;

					const attributesStringStartIndex = expression.index + expression[1].length + 2;

					for (const attr of attributesString.matchAll(attrRegex)) {
						const leadingSpace = attributesString.substring(lastIndex, attr.index);
						if (leadingSpace.trim() !== '') {
							const errorIndex = attributesStringStartIndex + lastIndex + leadingSpace.indexOf(leadingSpace.trim());
							throw new SyntaxError(this._wbll.slice(0, errorIndex) + ' ⋙' + this._wbll.slice(errorIndex));
						}

						let value = attr[3] || "true";
						if (token.symbol === '\\a') {
							value = `wbpl(\`${value.replace(/`/g, '\\`')}\`, ph)`;
						}
						token.attrs.set(attr[1], value);
						lastIndex = attr.index + attr[0].length;
					}

					const trailingChars = attributesString.substring(lastIndex);
					if (trailingChars.trim() !== '') {
						const errorIndex = attributesStringStartIndex + lastIndex + trailingChars.indexOf(trailingChars.trim());
						throw new SyntaxError(this._wbll.slice(0, errorIndex) + ' ⋙' + this._wbll.slice(errorIndex));
					}

					if (token.symbol === "\\s")
						for (const [key, value] of token.attrs)
							this.settings.set(key, value);
					else if (token.symbol === "\\A")
						this.groupAttributes = pattern[1] || "";
					else if (token.symbol === "\\a") {
						const lastLogicalToken = [...this.tokens].reverse().find(t => !['<', '>'].includes(t.symbol));

						if (lastLogicalToken)
							for (const [key, value] of token.attrs)
								lastLogicalToken.attrs.set(key, value);
						else
							this.blockAttributes = pattern[1] || "";

					} else
						this.tokens.push(token);
					continue;

				} else if (token.symbol[0] === '\\' && 'rnt'.includes(token.symbol[1])) { // \r, \n, \t
					this.tokens.push(token);
					continue;
				} else if (pattern[1] || "hcrw".indexOf(token.symbol) !== -1) {
					token.args = "chrw".indexOf(token.symbol) != -1 ? [""] : []; // No format argument
					for (const arg of ((pattern[1] || '') + ';').matchAll(/(?:(=?(["']?)[^]*?\2));/gmu))
						token.args.push(arg[1]);
					const type = ["hidden", "checkbox", "radio", "password", ""].at("hcrw".indexOf(token.symbol));
					if (type) {
						token.attrs.set("type", `'${type}'`);
					}
					if ("eEchrw".indexOf(token.symbol) != -1)
						token.attrs.set("name", `'${token.args[1] || "@@"}'`);
					else if ("dDmMsSu".indexOf(token.symbol) != -1)
						token.attrs.set("name", `'${token.args[0] || "@@"}'`);
					token.attrs.set("value", `'${token.args[2] || "@@"}'`);
				}

				if (pattern[2]?.match("^[<>p]")) {
					if (/^[<>p]/.test(pattern[1])) {
						pattern[2] = pattern[1];
						token.args[0] = "";
					}
					for (const symbol of pattern[2].matchAll(/(<|>|p(?:\('([^]*?)'\)?)?)/gmu)) {
						if (symbol[2]) {
							const pair = [...symbol[2].matchAll(/([a-zA-Z0-9-_]*)(?:;([^]*))?/gmu)][0];
							this.tokens.at(-1)?.params.push(new STWToken("p", [pair[1], pair[2] || "@@"]));
						} else
							token.params.push(new STWToken(symbol[0][0]));
					}
				}

				if ("fitvxyz".indexOf(token.symbol) != -1 && this.tokens.at(-1) && "aA".indexOf(this.tokens.at(-1)?.symbol || "") != -1 && !this.tokens.at(-1)?.text) {
					(this.tokens.at(-1) as STWToken).text = token;
					continue;

				} else if ("t" === token.symbol && this.tokens.at(-1)?.symbol === "b" && !this.tokens.at(-1)?.text) {
					(this.tokens.at(-1) as STWToken).text = token;
					continue;

				} else if (token.symbol === "A") {
					token.symbol = "a";
					token.attrs.set("target", "_blank");
				} else if ("tj".indexOf(token.symbol) != -1)
					token.args = [pattern[1] || ""];

				this.tokens.push(token);
			}
		}

		// TODO: The key is mandatory if the button perform CRUD operations. b('url;action...')
		this._acts = ACTIONS.stwnone; // Reset CRUD mode
		this.tokens.forEach(token => {
			if (token.symbol === "b" && token.args[1] === "stw")
				switch (token.args[2]) {
					case "search": this._acts |= ACTIONS.stwsearch; break;
					case "filter": this._acts |= ACTIONS.stwfilter; break;
					case "insert": this._acts |= ACTIONS.stwinsert; break;
					case "update": this._acts |= ACTIONS.stwupdate; break;
					case "delete": this._acts |= ACTIONS.stwdelete; break;
					case "submit": this._acts |= ACTIONS.stwsubmit; break;
					case "logon": this._acts |= ACTIONS.stwlogon; break;
					case "logoff": this._acts |= ACTIONS.stwlogoff; break;
					case "pwdreset": this._acts |= ACTIONS.stwpwdreset; break;
				}
		});
	}

	public acts(modes: ACTIONS): boolean {
		return (this._acts & modes) !== 0;
	}

	public get hasTokens(): boolean {
		return this.tokens.length > 0;
	}

	public get wbll(): string {
		return this._wbll;
	}
	public set wbll(value: string) {
		this._wbll = value;
		this._lex();
	}

	public render(req: Request, session: STWSession, fields: string[], ph: Map<string, string>, isInteractive: boolean = false): string {
		for (const [key, value] of ph.entries())
			if (value === 'null' || value === 'undefined')
				ph.set(key, '');

		if (!this._render) {
			const fn: string = this.compileRenderFunction(isInteractive);
			this._render = new Function("req", "session", "fields", "ph", "wbpl", fn) as (req: Request, session: STWSession, fields: string[], ph: Map<string, string>, wbplFn: (text: string, ph: Map<string, string>) => string) => string;
		}
		return this._render(req, session, fields, ph, wbpl);
	}

	// Token handlers are functions that take a token and return a string of JavaScript code
	// that will be executed to render the token into HTML.
	private initializeHandlers(): Map<string, (token: STWToken, inline: boolean) => string> {
		const handlers = new Map<string, (token: STWToken) => string>();

		const attributes = (token: STWToken, inline: boolean = false): string =>
			[...token.attrs.entries()].map(([k, v]) => {
				if (k.startsWith("@"))
					return ` \${(ph.get("${k}") || "")}`;
				if (v.startsWith("${") && v.endsWith("}") || inline)
					return ` ${k}="${v}"`;
				if (v === "")
					return ` ${k}`;
				return ` ${k}="\${${v}}"`;
			}).join("");

		/**
		 * Generates a block of JavaScript code that will, at render time,
		 * build a URL and its query string using the URL and URLSearchParams APIs.
		 * @param baseUrl The base URL for the link.
		 * @param params The list of parameter tokens (p).
		 * @returns A string of JavaScript code.
			*/
		const querystring = (baseUrl: string, params: STWToken[]): string => {
			let code = `let base = typeof window === 'undefined' ? (origin.url || 'http://localhost') : location.href; let url = new URL(\`${baseUrl}\` || '/', base), p_name, p_val;`;
			for (const param of params) {
				const nameArg = `"${param.args[0] || ''}" || fieldName`;
				const valueArg = param.args[1] ? `wbpl("${param.args[1]}", ph)` : `(ph.get("@@" + (${nameArg})) || "")`;
				code += `p_name = ${nameArg}; p_val = ${valueArg}; if (p_val) url.searchParams.set(p_name, p_val);`;
				if (!param.args[0])
					code += `fldCursor();\n`;
			}
			code += `href = url.href;`;
			return code;
		};

		handlers.set("a", (token) => {
			token.attrs.delete("value");
			token.attrs.delete("href");

			const innerToken = token.text || new STWToken("t", [token.args[0] || ""]);
			const textHandler = STWLayout.tokenHandlers.get(innerToken.symbol);
			const textCode = textHandler ? textHandler(innerToken, false) : "";

			const baseUrl = token.args[0] || ""

			return `{
				let href = "";
				let baseUrl = wbpl(\`${baseUrl.replace(/`/g, '\\`')}\`, ph);
				if (baseUrl === "") {
					baseUrl = ph.get("@@" + fieldName) || "";
					fldCursor();
				}
				const hasProtocol = /^[a-z]+:\\/\\//i.test(baseUrl);
				const queryParams = new URLSearchParams();
				let p_name, p_val;
				${token.params.map(param => {
				if (param.symbol === "p") {
					const nameArg = `"${param.args[0] || ''}" || fieldName`;
					const valueArg = param.args[1] ? `wbpl(\`${param.args[1].replace(/`/g, '\\`')}\`, ph)` : `(ph.get("@@" + (${nameArg})) || "")`;
					return `p_name = ${nameArg}; p_val = ${valueArg}; if (p_val) queryParams.set(p_name, p_val); fldCursor();`;
				} else if (param.symbol === "<") {
					return `fldCursor(-1);`;
				} else if (param.symbol === ">") {
					return `fldCursor();`;
				}
				return "";
			}).join('\n')}
				const queryString = queryParams.toString();
				if (hasProtocol) {
					const url = new URL(baseUrl);
					queryParams.forEach((value, key) => url.searchParams.set(key, value));
					href = url.href;
				} else if (typeof window === 'undefined') {
					const base = req.url || 'http://localhost';
					const url = new URL(baseUrl, base);
					queryParams.forEach((value, key) => url.searchParams.set(key, value));
					href = url.href;
				} else
					href = baseUrl + (queryString ? '?' + queryString : '');
				const textContent = (() => { let html=""; ${textCode} return html; })();
				html+=\` <a href="\${href}"${attributes(token)}>\${textContent.trim()}</a>\`;
			}`;
		});

		handlers.set("b", (token) => {
			const value = (token.args[1] + token.args[2]) || "";
			token.attrs.set("name", "stwAction");
			token.attrs.set("type", value === "" ? "button" : value === "stwreset" ? "reset" : "submit");
			if (value) token.attrs.set("value", value); else token.attrs.delete("value");
			return `html+=\`<button${attributes(token, true)}>${token.text?.args[0] || ""}</button>\`;`
		});

		const checkboxRadioHandler = (token: STWToken) => {
			token.attrs.set("name", `"${token.args[1] || ''}" || fieldName`);
			token.attrs.delete("value");

			const options = token.args.slice(3), mode = parseInt(options[0]);
			let js: string = `value=wbpl("${token.args[2] ?? ''}", ph) || fieldValue, checked = (value === fieldValue ? " checked" : "");`
			if (isNaN(mode)) 
				return `html+=\`<input${attributes(token)}\${checked}>\`;`;

			js += `html+=\`<fieldset class="stwGroup">\`;`
			if (mode === 1)
				for (let i = 1; i < options.length; i += 1) {
					js += `checked = (value === "${options[i]}" ? " checked" : "");`; // TODO: multiple checkboxes
					js += `html+=\`<label><input${attributes(token)} value="${options[i]}"\${checked}>${options[i] || ""}</label>\`;`;
				}
			else if (mode === 2)
				for (let i = 1; i < options.length; i += 2) {
					js += `checked = (value === "${options[i]}" ? " checked" : "");`; // TODO: multiple checkboxes
					js += `html+=\`<label><input${attributes(token)} value="${options[i]}"\${checked}>${options[i + 1] || ""}</label>\`;`;
				}
			js += `html+=\`</fieldset>\`; if (!"${token.args[1]}") fldCursor();`;
			return js;
		};

		handlers.set("c", checkboxRadioHandler);

		const selectHandler = (token: STWToken) => {
			token.attrs.set("name", `"${token.args[0] || ''}" || fieldName`);
			token.attrs.set("value", `wbpl("${token.args[1] ?? ''}", ph) || fieldValue`);
			if ("sS".indexOf(token.symbol) !== -1) token.attrs.set("multiple", "");

			let js: string = `html+=\`<select${attributes(token)}>${"SD".indexOf(token.symbol) < 0 ? '<option></option>' : ''}\`;`
			const options = token.args.slice(2), mode = parseInt(options[0]);
			if (mode === 1)
				for (let i = 1; i < options.length; i += 1)
					js += `html+=\`<option value="${options[i]}">${options[i]}</option>\`;`;
			else if (mode === 2)
				for (let i = 1; i < options.length; i += 2)
					js += `html+=\`<option value="${options[i]}">${options[i + 1]}</option>\`;`;
			js += `html+=\`</select>\`;if (!"${token.args[0]}") fldCursor();`;
			return js;
		};

		handlers.set("d", selectHandler);
		handlers.set("D", selectHandler);

		const fieldInputHandler = (token: STWToken, _recurse: boolean = false) => {
			const nameArg = token.symbol === 'e' ? token.args[1] : token.args[0];
			const valueArg = token.symbol === 'e' ? token.args[2] : token.args[1];

			token.attrs.set("name", `"${nameArg || ''}" || fieldName`);
			token.attrs.set("value", `fieldValue || wbpl("${valueArg ?? ''}", ph)`);

			return `html+=\`<input${attributes(token)}>\`;${!nameArg ? 'fldCursor();' : ''}`;
		};
		handlers.set("e", fieldInputHandler);

		handlers.set("f", () => `html+=" "+fieldValue+" ";fldCursor();`);

		handlers.set("h", fieldInputHandler);

		handlers.set("i", (token) => {
			const mode = token.args[0];
			const options = JSON.stringify(token.args.slice(1));

			let srcExpression: string;
			if (mode === "1") {
				srcExpression = `(${options}[Number(fieldValue)-1]||"")`;
			} else if (mode === "2") {
				srcExpression = `(()=>{const opts=${options};let idx=opts.findIndex((v,i)=>i%2===0&&v==String(fieldValue));return (idx!==-1&&opts[idx+1])?opts[idx+1]:opts.at(-1);})()`;
			} else {
				srcExpression = `wbpl(\`${mode || ''}\`, ph)`;
			}

			token.attrs.set("src", `${srcExpression} || fieldName`);
			token.attrs.delete("value");
			return `html+=\`<img${attributes(token)}>\`;fldCursor();`;
		});

		handlers.set("j", (token) => `html+=\`<script>\${wbpl("${token.args[0].replaceAll('"', '\\"') ?? ''}", ph)}</script>\`;`);
		handlers.set("v", (token) => `html+=\`${eval(token.args[0]) ?? ''}\`;`);

		handlers.set("k", (token) => `if ("${token.args[0] ?? ''}") ph.set("${token.args[0]}", "${token.args[1] ?? ''}");`);

		handlers.set("l", (token) => {
			token.attrs.delete("value");
			return `html+=\`<label${attributes(token)}>\${"${token.args[0] ?? ''}" || fieldName}</label>\`;`;
		});

		handlers.set("m", (token) => {
			const nameArg = token.args[0];
			const valueArg = token.args[1];
			// Remove backslash before ${ so it will be interpolated by render-time code generator
			token.attrs.set("name", `"${nameArg || ''}" || fieldName`);
			if (!nameArg && !valueArg)
				return `html+=\`<textarea${attributes(token)}>\${fieldValue}</textarea>\`;fldCursor();`;
			return `html+=\`<textarea${attributes(token)}>\${wbpl("${valueArg ?? ''}", ph) || fieldValue}</textarea>\`;${!nameArg ? 'fldCursor();' : ''}`;
		});

		handlers.set("n", (token) => {
			const mode = token.args[0], options = JSON.stringify(token.args.slice(1));
			if (mode === "1")
				return `html+=${options}[Number(fieldValue)-1]||"";fldCursor();`;
			if (mode === "2")
				return `{const opts=${options};let idx=opts.findIndex((v,i)=>i%2===0&&v==String(fieldValue));html+=(idx!==-1&&opts[idx+1])?opts[idx+1]:opts.at(-1);}fldCursor();`;
			return "fldCursor();";
		});

		handlers.set("o", (token) => {
			token.attrs.set("id", crypto.randomUUID());
			token.attrs.set("href", `\${"${token.args[0]}" + "${querystring("/", token.params)}"}`);
			return `html+=\`<article${attributes(token)}></article>\`;`;
		});

		handlers.set("r", checkboxRadioHandler);
		handlers.set("s", handlers.get("d")!);
		handlers.set("S", handlers.get("D")!);
		handlers.set("t", (token, inline = false) => inline ? token.args[0] : `html+=\`${token.args[0]}\`;`);

		handlers.set("u", (token) => `html+=\`<input type="file"${attributes(token)}>\`;`);

		handlers.set("w", fieldInputHandler);

		const noOpHandler = () => ``;
		handlers.set("x", noOpHandler);
		handlers.set("y", noOpHandler);
		handlers.set("z", noOpHandler);

		handlers.set("\\r", () => `html+="<br>";`);
		handlers.set("\\n", () => `html+="<br>";`);
		handlers.set("\\t", () => `html+="<label></label>";`);

		handlers.set(">", () => `fldCursor();`);
		handlers.set("<", () => `fldCursor(-1);`);

		return handlers;
	}

	private compileRenderFunction(isInteractive: boolean): string {
		let fn = `let html="",fld=0,df=0,fieldName=(fields[0] ?? "stwFld0"),fieldValue=ph.get("@@" + fieldName) ?? "",fldCursor=(df=1)=>{fld+=df; if(fld<0) fld=0; else if (fld>=fields.length) fld=fields.length; fieldName=fields[fld] ?? "stwFld"+fld; fieldValue=ph.get("@@"+fieldName) ?? "";return "";};`;

		for (const token of this.tokens) {
			let handler: ((token: STWToken, inline: boolean) => string) | undefined;
			let tokenToRender = token;

			if (isInteractive)
				handler = STWLayout.tokenHandlers.get(token.symbol);
			else
				switch (token.symbol) {
					case 'e':
					case 'w':
					case 'm':
					case 'u':
						handler = STWLayout.tokenHandlers.get('f');
						break;
					case 'b':
					case 'h':
						handler = undefined; // Render nothing
						break;
					case 'd':
					case 'D':
						handler = STWLayout.tokenHandlers.get('n');
						tokenToRender = new STWToken('n', ['2', ...token.args], token.params, token.attrs, token.text);
						break;
					case 's': {
						const options = JSON.stringify(token.args);
						fn += `{
                            const values = String(fieldValue).split(',').map(s => s.trim());
                            const opts = ${options};
                            const mappedValues = values.map(val => {
                                const idx = opts.findIndex((v, i) => i % 2 === 0 && v === val);
                                return (idx !== -1 && opts[idx + 1]) ? opts[idx + 1] : '';
                            }).filter(v => v);
                            html += mappedValues.join(', ');
                            fldCursor();
                        }`;
						handler = undefined; // Custom code generated
						break;
					}
					case 'c':
					case 'r':
						tokenToRender = new STWToken(token.symbol, token.args, token.params, new Map(token.attrs), token.text);
						tokenToRender.attrs.set('disabled', 'true');
						handler = STWLayout.tokenHandlers.get(tokenToRender.symbol);
						break;
					default:
						handler = STWLayout.tokenHandlers.get(token.symbol);
				}

			if (handler)
				fn += handler(tokenToRender, false);
		}

		fn += "return html;";
		return fn;
	}
}

export function isTruthy(val: string | undefined): boolean {
	if (!val || val === "false") return false;
	if (val === "true") return true;
	const num = Number(val);
	return !isNaN(num) && num !== 0;
}
