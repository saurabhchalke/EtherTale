# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.0](https://github.com/privacy-scaling-explorations/maci/compare/v1.1.1...v1.2.0) (2024-02-23)


### Features

* **qv:** add optional flag to use quadratic voting or not in MACI ([86ba854](https://github.com/privacy-scaling-explorations/maci/commit/86ba8548780049245482e5277cc47f4a8776e9e6))
* update sidebar ([6206a1b](https://github.com/privacy-scaling-explorations/maci/commit/6206a1b8849108d78997e00b01c6e7f11efce124))


### Bug Fixes

* **circuits:** enforce use of stateIndex from message ([510e6ee](https://github.com/privacy-scaling-explorations/maci/commit/510e6ee365958e8c7f72cfca6cea75d15a89d28b))
* **circuits:** fix coordinator censoring by passing currentVoteWeight = 0 ([22e091d](https://github.com/privacy-scaling-explorations/maci/commit/22e091d2941b5e86ecd7df2f228bd0e10b6c4c47))
* **contracts:** save numSignups after merging maciStateAq inside the Poll contract ([4985b2d](https://github.com/privacy-scaling-explorations/maci/commit/4985b2d61655f3b802186fc03c2d85a658c0f0da)), closes [#1091](https://github.com/privacy-scaling-explorations/maci/issues/1091)
* **publish:** ensure we publish the correct files ([bc42724](https://github.com/privacy-scaling-explorations/maci/commit/bc42724b34cf0c047c5692fbf477ed013a102aee))
* **publishing:** do not publish benchmarks folder ([f2fbc36](https://github.com/privacy-scaling-explorations/maci/commit/f2fbc368a8a9520288b365e6fdf04fd3fee9e685))
* **signups:** ensure we account for the blank state leaf ([b1c8c97](https://github.com/privacy-scaling-explorations/maci/commit/b1c8c9719da5d47b92408f1222399c9c4acf3df9)), closes [#947](https://github.com/privacy-scaling-explorations/maci/issues/947)
* **topup:** check valid new state leaf balance ([ec12d2b](https://github.com/privacy-scaling-explorations/maci/commit/ec12d2b1ec31b0607f65be49a5679fcae5e3939d))


### Code Refactoring

* **contracts:** add natspec across contracts and cleanup ([a6ad25e](https://github.com/privacy-scaling-explorations/maci/commit/a6ad25e3787fee837172b95ee706951806131bd4))
* **core:** cleanup the core package and ensure every function has a proper type ([f277e48](https://github.com/privacy-scaling-explorations/maci/commit/f277e48c040148f741e7a8cd8dbea9e6bf4ea1cc))
* **core:** export `TestHarness` from core test utils ([f8d4ccb](https://github.com/privacy-scaling-explorations/maci/commit/f8d4ccb3b70c006bb4aa59d67e5528f7bbf91d8e))
* **core:** refactor the core package subsidy and tally functions ([0af7dd2](https://github.com/privacy-scaling-explorations/maci/commit/0af7dd2d448c4796c3872665d43654343f9fc3e3))
* **core:** refactor the process message functions and general cleanup ([823cacd](https://github.com/privacy-scaling-explorations/maci/commit/823cacd8659281b8390b74c8d765b23ee7a83a80))
* **core:** remove redundant code which could slow down processing ([5a6fe98](https://github.com/privacy-scaling-explorations/maci/commit/5a6fe987a8e648abbcfd7ce2d768e216c19231a3))
* **core:** remove unnecessary messageAq from Poll ([d3930f7](https://github.com/privacy-scaling-explorations/maci/commit/d3930f706963747903305cce1ee5a716ea28c31d))
* **core:** remove unnecessary stateAq from MaciState ([22a4f28](https://github.com/privacy-scaling-explorations/maci/commit/22a4f286010ff5add413eee88d933c0e74898346))
* **core:** update README.md ([11ba386](https://github.com/privacy-scaling-explorations/maci/commit/11ba386a37cc802c4fd6a3c243e493de8e04a339))
* **crypto:** remove ffjavascript and implement utils functions locally ([0b2986f](https://github.com/privacy-scaling-explorations/maci/commit/0b2986fcaadbfce37ff9fc0007ddeae97573924e)), closes [#458](https://github.com/privacy-scaling-explorations/maci/issues/458)
* fix ESLint issues ([6c0ed97](https://github.com/privacy-scaling-explorations/maci/commit/6c0ed97c0976a81b5e5506699d550ec93a553cb8))
* **maci-core:** refactor directory structure for quick core component access ([3aeba77](https://github.com/privacy-scaling-explorations/maci/commit/3aeba77435fbd783e5cecf88a1f2c0d4c58c8022))
* **nonqv:** optimize tally votes non qv circuit and contracts ([ea632a9](https://github.com/privacy-scaling-explorations/maci/commit/ea632a97862c4304c764f511ab480b3664224b5f))
* **optimisedmt:** remove dependency and implement locally ([c7d81e2](https://github.com/privacy-scaling-explorations/maci/commit/c7d81e20aaf6308c7d4e1efc09c497729f6a8f10))
* **repo:** remove redundant code from certain packages ([d55497a](https://github.com/privacy-scaling-explorations/maci/commit/d55497a9805812b2d2472386caecf75995d6efcf))
* **zk-kit-poseidon:** remove old circomlib dependencies in crypto ([0340f79](https://github.com/privacy-scaling-explorations/maci/commit/0340f7960a2214410d8885541ac542419a980a34))


### Miscellaneous

* add a badges to README.md ([888524b](https://github.com/privacy-scaling-explorations/maci/commit/888524baae82d56edbf0c794e587de174906c34c))
* add types check ([69f038f](https://github.com/privacy-scaling-explorations/maci/commit/69f038f55e6c740d43b8b5376db999bcf92de845))
* apply prettier ([8b905c0](https://github.com/privacy-scaling-explorations/maci/commit/8b905c0948d4a1f950653c6812067ec98ebfcbc8))
* bundle size optimizations ([18da49c](https://github.com/privacy-scaling-explorations/maci/commit/18da49c791e53350158659df8248d48af8e80f6d))
* **changelog:** add CHANGELOG of v1.1.1 ([f0c315a](https://github.com/privacy-scaling-explorations/maci/commit/f0c315a4c1b86f88839f2dbe4c4b9f59193f7be4))
* **cli:** integrate linter ([49571a1](https://github.com/privacy-scaling-explorations/maci/commit/49571a1199a8a027c64a7c39bd21f46a3a268f43))
* **cli:** optimize bundle size ([39268b2](https://github.com/privacy-scaling-explorations/maci/commit/39268b2ff8e0d27d062c6d3bc52a63ce8038ec5e))
* **contract:** apply linter for deploy scripts and contracts ([9af9c04](https://github.com/privacy-scaling-explorations/maci/commit/9af9c0497a2491eaf89fbff475cf0f60bc04f59c))
* **core:** add `CircuitInputs` type ([c4b72b0](https://github.com/privacy-scaling-explorations/maci/commit/c4b72b0f0b25a1bb147348a728a9550c8b6460a1))
* **core:** add quiet flag to process messages to log errors ([8793a09](https://github.com/privacy-scaling-explorations/maci/commit/8793a09dd3c52021d467b27e1cb64c023faba317)), closes [#1135](https://github.com/privacy-scaling-explorations/maci/issues/1135)
* **core:** add Typedoc comments ([a8521ee](https://github.com/privacy-scaling-explorations/maci/commit/a8521eea97bca47298bc2c59ae1c31df9533258b))
* **core:** add unit tests for the process messages functions of the core package ([c78e1b4](https://github.com/privacy-scaling-explorations/maci/commit/c78e1b4c4a7acea9e18beef7291c8258b7b08c65))
* **core:** integrate linter ([614e76b](https://github.com/privacy-scaling-explorations/maci/commit/614e76b1b1de5d2c9876b11f15439e92b86db8f6))
* **core:** process messages test ([3db370e](https://github.com/privacy-scaling-explorations/maci/commit/3db370ef876213b1cefce39fb98b00640d9750e9))
* **core:** publish a declaration file ([0b55568](https://github.com/privacy-scaling-explorations/maci/commit/0b55568ee41dc9191b342dab057feccd1745b5fd))
* **core:** refactor and add tests for the core package ([4aedb83](https://github.com/privacy-scaling-explorations/maci/commit/4aedb83c917c0590f88a982a4b2eb910a2aab893))
* **core:** remove unnecessary code ([5f6d6b5](https://github.com/privacy-scaling-explorations/maci/commit/5f6d6b507665c64a7f6b0c81b0fc2475bc073984))
* **core:** replace repeated chaining call ([0588ef6](https://github.com/privacy-scaling-explorations/maci/commit/0588ef649420b850c9fe6f115dc5431016b741fb))
* **coverage:** setup coverage for TS packages ([f4e6964](https://github.com/privacy-scaling-explorations/maci/commit/f4e6964b3e268e4d3f2819b85e6abf3e34bcb10e))
* **crypto:** add type export for path elements ([35866fb](https://github.com/privacy-scaling-explorations/maci/commit/35866fb0f086b18835b74e5ecdb55aaceb3ef8db))
* **dependencies:** update project dependencies and remove redundant ones ([4c5ac27](https://github.com/privacy-scaling-explorations/maci/commit/4c5ac27767492c9867a6e2ab2acd6b10fe132847))
* **deps-dev:** bump @types/node from 18.19.6 to 20.10.8 ([6645120](https://github.com/privacy-scaling-explorations/maci/commit/664512038212d36d40799e8c4787847735bd7d82))
* **deps-dev:** bump @types/node from 20.10.8 to 20.11.0 ([805d253](https://github.com/privacy-scaling-explorations/maci/commit/805d2536a54478c51403362419ecad0b6ab736a7))
* **deps-dev:** bump @types/node from 20.11.0 to 20.11.2 ([45839e8](https://github.com/privacy-scaling-explorations/maci/commit/45839e8c2668ec56ea06221758605f88029ea8a1))
* **deps-dev:** bump @types/node from 20.11.10 to 20.11.16 ([8144919](https://github.com/privacy-scaling-explorations/maci/commit/8144919939f7d9a841eb6fce7182628cedbf8746))
* **deps-dev:** bump @types/node from 20.11.16 to 20.11.17 ([44de5db](https://github.com/privacy-scaling-explorations/maci/commit/44de5db0c25a5fdfd5c13c397f49edb7185bf1f5))
* **deps-dev:** bump @types/node from 20.11.17 to 20.11.19 ([8d86b32](https://github.com/privacy-scaling-explorations/maci/commit/8d86b32ef70b89f4239aad3903fd36937cf6a90f))
* **deps-dev:** bump @types/node from 20.11.2 to 20.11.5 ([7698ede](https://github.com/privacy-scaling-explorations/maci/commit/7698edef2b95bc017e54c1fc0d796ccc9da3de85))
* **deps-dev:** bump @types/node from 20.11.5 to 20.11.10 ([a2c445a](https://github.com/privacy-scaling-explorations/maci/commit/a2c445a295e792e421f6c1537b2b21f8a7648683))
* **deps-dev:** bump lerna from 6.6.2 to 8.0.2 ([4b150ad](https://github.com/privacy-scaling-explorations/maci/commit/4b150ade7c4fbaf88eb0e1f629cec6749377706d))
* **deps-dev:** bump mocha from 10.2.0 to 10.3.0 ([2b76e04](https://github.com/privacy-scaling-explorations/maci/commit/2b76e0445f5da5864a335352f66eac33c070ab29))
* **domainobjs:** apply linter rules and fixes ([6649ca6](https://github.com/privacy-scaling-explorations/maci/commit/6649ca6d2afc83cfec60008fa6314add1cd837cd))
* **intergationTests:** apply linter for integration tests package ([ef75ec3](https://github.com/privacy-scaling-explorations/maci/commit/ef75ec37b2b4e000ad4b3fcdbdf85ba822690512))
* **key-change:** add tests and docs around key-change ([ce394e2](https://github.com/privacy-scaling-explorations/maci/commit/ce394e2d2bf3c8c6748cf8e8d1e401b8f3c924ee))
* linter ([42ea4f0](https://github.com/privacy-scaling-explorations/maci/commit/42ea4f0ae8b342f6bd5ca5ac86f1bdd143978324))
* linter unification ([61a8bcd](https://github.com/privacy-scaling-explorations/maci/commit/61a8bcd915fd3e4b4da3c00d40704d892c02f51b))
* **poll:** unify pollId type ([21d01ef](https://github.com/privacy-scaling-explorations/maci/commit/21d01efc565df74ea8b71dfeeead60be5a07db56))
* **publishing:** remove bash script for empty ballot roots contract ([025287c](https://github.com/privacy-scaling-explorations/maci/commit/025287c778547e0acb1582532f3412e022cca6fa))
* **release:** publish 1.1.2 ([10b3a85](https://github.com/privacy-scaling-explorations/maci/commit/10b3a85cc9b53c0fc1ccdf54221a48ec8d6efe0d))
* remove `gitHead` field from package.json ([d38ba71](https://github.com/privacy-scaling-explorations/maci/commit/d38ba71301469f350b3d80eab5bf94e779dda9cc))
* run prettier ([d09cd0e](https://github.com/privacy-scaling-explorations/maci/commit/d09cd0e01ac747245307ceec5343d9ed30d7a6f0))
* run prettier fix after bumping version ([e1f85a5](https://github.com/privacy-scaling-explorations/maci/commit/e1f85a53bbb72696b6998af5406748fd18df4701))
* **topup:** implement test cases for the topup feature ([7775a8b](https://github.com/privacy-scaling-explorations/maci/commit/7775a8b3295f29b098446d3e78a4200c03c847dd))



## [1.1.2](https://github.com/gurrpi/maci/compare/v1.1.1...v1.1.2) (2023-01-19)

### Miscellaneous

- add a badges to README.md ([888524b](https://github.com/gurrpi/maci/commit/888524baae82d56edbf0c794e587de174906c34c))
- **changelog:** add CHANGELOG of v1.1.1 ([ea1f0ca](https://github.com/gurrpi/maci/commit/ea1f0ca93f1618df0ba046f1f01b2abad57e0ee1))

## [1.1.1](https://github.com/gurrpi/maci/compare/v1.1.0...v1.1.1) (2022-12-03)

### Bug Fixes

- **core/ts/macistate.ts:** fix nothing_up_to_my_sleeve bug in MaciState.ts as well as unit tests ([3d2b21f](https://github.com/gurrpi/maci/commit/3d2b21f185c285542b92512a871b0886a3fedc83))
- **fix insert placeholder leaf bug:** fix issue related to first msg leaf ([b4b9da1](https://github.com/gurrpi/maci/commit/b4b9da1aff830daad2c70f530749df50cea9334f))
- **maci:** implemented fixes for several audit issues ([6f1fa85](https://github.com/gurrpi/maci/commit/6f1fa85299ebbc8fe10e30691afe8f036b8c68d1)), closes [#503](https://github.com/gurrpi/maci/issues/503) [#504](https://github.com/gurrpi/maci/issues/504) [#505](https://github.com/gurrpi/maci/issues/505) [#508](https://github.com/gurrpi/maci/issues/508) [#510](https://github.com/gurrpi/maci/issues/510)
- **maci:** reverted a fix and fixed test suits ([8300cc5](https://github.com/gurrpi/maci/commit/8300cc548e954a80ab6fb39ab9d559c999e07c10))
- **maci:** upgraded minor version and fixed bug in testnet deployment ([5ef5ed8](https://github.com/gurrpi/maci/commit/5ef5ed842360277ac823c6919e171d0c51ff5702)), closes [#551](https://github.com/gurrpi/maci/issues/551) [#552](https://github.com/gurrpi/maci/issues/552)
- **processmessages.circom:** data are not fully verified during state update ([6df6a40](https://github.com/gurrpi/maci/commit/6df6a4054da926b07f35c5befab4f1f8af33dcc6))
