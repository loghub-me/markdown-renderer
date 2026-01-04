# LogHub - markdown-renderer

![Node.js](https://img.shields.io/badge/node-24-green?style=plastic)
![pnpm](https://img.shields.io/badge/pnpm-10-orange?style=plastic)

![GitHub License](https://img.shields.io/github/license/loghub-me/markdown-renderer?style=plastic&logo=github&color=white)
![GitHub Release](https://img.shields.io/github/release/loghub-me/markdown-renderer?style=plastic&logo=github&color=white)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/loghub-me/markdown-renderer/ci.yml?style=plastic&logo=github&label=CI)](https://github.com/loghub-me/web/actions)

#### Repositories

| Repository                                                                                                                                                  | Description                              | Links                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-web-f94949?style=plastic&logo=github)](https://github.com/loghub-me/web)                            | 웹 애플리케이션<br/>Next.js + TypeScript | - [소개](https://github.com/loghub-me/web#소개)<br/>- [구조](https://github.com/loghub-me/web#구조)<br/>- [개발](https://github.com/loghub-me/web#개발)<br/>- [기여](https://github.com/loghub-me/web#기여)                                                         |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-api-6db240?style=plastic&logo=github)](https://github.com/loghub-me/api)                            | API 서버<br/>Spring Boot + Kotlin        | - [소개](https://github.com/loghub-me/api#소개)<br/>- [구조](https://github.com/loghub-me/api#구조)<br/>- [개발](https://github.com/loghub-me/api#개발)<br/>- [기여](https://github.com/loghub-me/api#기여)                                                         |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-task--api-aab2ff?style=plastic&logo=github)](https://github.com/loghub-me/task-api)                 | 보조 API 서버<br/>Elysia + TypeScript    | - [소개](https://github.com/loghub-me/task-api#소개)<br/>- [구조](https://github.com/loghub-me/task-api#구조)<br/>- [개발](https://github.com/loghub-me/task-api#개발)<br/>- [기여](https://github.com/loghub-me/task-api#기여)                                     |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-markdown--render-2d79c7?style=plastic&logo=github)](https://github.com/loghub-me/markdown-renderer) | 마크다운 렌더러                          | - [소개](https://github.com/loghub-me/markdown-renderer#소개)<br/>- [구조](https://github.com/loghub-me/markdown-renderer#구조)<br/>- [개발](https://github.com/loghub-me/markdown-renderer#개발)<br/>- [기여](https://github.com/loghub-me/markdown-renderer#기여) |

## 소개

이 레포지토리는 LogHub 마크다운 렌더러 소스 코드를 포함합니다. TypeScript로 작성되었으며, [loghub-me/web](https://github.com/loghub-me/web), [loghub-me/task-api](https://github.com/loghub-me/task-api)에서 사용됩니다.

## 구조

- `src/`
  - `index.ts` : 엔트리 포인트입니다.
  - `types.ts` : 마크다운 렌더러에서 사용하는 타입들을 정의합니다.
  - `plugins/` : 마크다운 렌더링에 사용되는 플러그인들을 포함합니다.
- `test/` : 마크다운 렌더러의 유닛 테스트를 포함합니다.

## 개발

### 개발 환경

- Node.js v24
- pnpm v10

### 설치 및 실행

```sh
$ pnpm install --frozen-lockfile
$ pnpm test # 유닛 테스트 실행
$ pnpm build # 빌드
```

## 기여

기여는 언제나 환영합니다! 버그 리포트, 기능 제안, PR 등 다양한 방법으로 기여할 수 있습니다. 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고해주세요.
