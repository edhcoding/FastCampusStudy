/**
 * 초기 세팅 (yarn berry(pnp) 사용)
 * 1. yarn create react-app wedding --template typescript
 * 
 * 2. node_modules 폴더 삭제
 * 
 * 3. yarn set version berry
 * - .yarn, .yarnrc.yml 파일도 생김 (이렇게 나와야 berry로 잘 세팅된거임)
 * 
 * 4. 이번 프로젝트에서는 node_modules 방식보다 pnp (plug n play)방식을 사용할거기 때문에 .yarnrc.yml 파일에
 * - nodeLinker: pnp => 라고 작성하면 앞으로는 Pnp 방식을 사용하겠다 라는 뜻임
 * - enableGlobalCache: false (cache폴더 안생기는 현상 없앰) yarn 버전이 올라가며 enableGlobalCache설정의 default값이 true로 바뀌었나보다. (얼마전까지 false였음)
 * 
 * 5. yarn install
 * - yarn install을 해보면 node_modules폴더는 없고 .yarn에 cache 폴더가 생김
 * - .pnp.cjs에서 의존성들을 관리함
 * - 아무런 타입스크립트 파일을 열면 타입이 깨짐 (cache폴더안에 typescript가 zip파일로 관리되고 있는데 vscode는 zip파일을 해석할 줄 모름)
 * 그러므로 extension으로 zipfs 설치해줘야함 => 터미널에 명령어 작성해줘야함
 * 
 * 6. yarn dlx @yarnpkg/sdks vscode (yarn dlx는 zip파일을 vscode가 읽게끔 하는 명령어)
 * - 이렇게 해야 vscode가 typescript를 읽게됨
 * - .vscode폴더가 생성돼서 봐보면 setting.json파일에 "typescript.tsdk": ".yarn/sdks/typescript/lib", 이런식으로 읽어오겠다고함
 * - shift + cmd + p => select typescript해서 영역타입설정? 눌러주면 해결
 * 
 * 7. App.tsst.tsx 파일보면 오류가 나옴 이 부분을 해결해줘야함
 * - yarn remove @testing-library/jest-dom 로 삭제하고
 * - 다시 설치 yarn add -D @types/testing-library__jest-dom @testing-library/jest-dom
 * 
 * 8. .gitignore설정 (https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored)
 * - 홈페이지에 들어가서 zero install 부분 복붙
 * - .gitignore 아래에 # yarn zero install 작성하고 복붙
 * 
 * 9. 여기까지하고 yarn start 해서 확인
 * 
 * 10. yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-config-react-app
 * - 이렇게 설치하기 전에 package.json을 보면 이미 eslintConfig라고 있음 => 이거보다는 밖으로 빼주는게 좋음 최상단에 .eslintrc.json파일을생성
 * - 그다음 package.json에서 extends 부분만 복사해서 .eslintrc.json 파일에 객체 하나 만들고 그안에 복붙 그다음 eslintConfig부분은 삭제
 * 
 * 11. eslintrc.json(코드 규칙) 파일안에 아래와 같이 작성
 * { 
 * "extends": [
 *     "react-app",
 *     "react-app/jest",
 *     "plugin:prettier/recommended"
 *   ],
 *   "plugins": ["prettier"],
 *   "rules": {
 *     "prettier/prettier": "error"
 *   }
 * }
 * 
 * 12. .prettierrc 파일 생성(코드 이쁘게 보이기위함)
{
"useTabs": false,
"printWidth": 80,
"tabWidth": 2,
"singleQuote": true,
"trailingComma": "all",
"endOfLine": "lf",
"semi": false,
"arrowParens": "always"
}

13. cmd + , 설정파일 들어가서 settings.json 파일에 작성
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
 + 나는 해당 안되는데 맥은 lf, 윈도우는 crlf인데 prettierrc에 lf라고 설정해뒀음 따라서 윈도우 쓰는 사람들도 앞으로 파일 만들때마다 lf로 만들게 해주려면
 setting.json에
 "files.eol": "\n" (역슬래쉬임)

14. eslint와 prettier 세팅은 끝났는데 vscode한테 zip 파일을 읽게 만들어야 하므로
- yarn dlx @yarnpkg/sdks vscode

15. eslint, prettier 설정한거 한번에 되게끔 package.json의 script로 가서 아래 코드 작성
이런 세팅이 귀찮아서 보통 회사들은 (https://github.com/titicacadev/triple-config-kit)
이렇게 config 파일만 따로빼서 package화를 해서 사용하기도함
*/
// "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
// "lint:fix": "eslint --fix \"src/**/*.{js,jsx,ts,tsx}\"",
// "dev:db": "json-server db.json --watch --port=8888"

/**
 * 16. craco 설치
 * - yarn add -D @craco/craco craco-alias
 * - Craco Alias 설정 (import App from "../../../../App.js" 싫어!)
 * - Craco란? create-react-app configuration override 약자, CRA에 config 설정을 덮어쓰기 위한 패키지임
 * 
 * 17. tsconfig.paths.json 파일 생성 및 작성
 * 
 * 18. craco.config.js 파일 생성 및 작성
 * 
 * 19. scss 설치
 * - yarn add classnames sass
 */
