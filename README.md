> 作者：蓝朽

## 项目介绍
深入业务场景的企业级实战项目，基于 UmiJS + React + Spring Boot + Redis + Caffine + ChatGLM AI + RxJava + SSE 的 AI 答题应用平台。
用户可以基于 AI 快速制作并发布多种答题应用，支持检索和分享应用、在线答题并基于评分算法或 AI 得到回答总结；管理员可以审核应用、集中管理整站内容，并进行统计分析。

> 项目在线地址：[www.landada.icu](https://www.landada.icu/)

## 架构设计图
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723097267066-5a2abece-c212-4606-a008-bd3e3461b493.png#averageHue=%23f4e9dc&clientId=u38ded80c-8acd-4&from=paste&height=738&id=u0e5251c3&originHeight=923&originWidth=969&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=150230&status=done&style=none&taskId=u70f892fb-3ff6-4c16-a59c-6a601447435&title=&width=775.2)
## 项目三大阶段

1. 第一阶段，开发**答题应用平台,**用户可以通过上传题目和自定义评分规则，创建答题应用，供其他用户检索和使用。该阶段涉及React + Spring Boot 前后端全栈项目从 0 到 1 的开发。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723095339909-427fc735-7779-45b4-9167-e6d19143f0e9.png#averageHue=%23f5f0ee&clientId=u38ded80c-8acd-4&from=paste&height=862&id=u50a9eb4f&originHeight=1077&originWidth=1798&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=839304&status=done&style=none&taskId=u6405da0a-1dc8-4351-9460-02abc433b9c&title=&width=1438.4)

2. 第二阶段，让 AI 为平台赋能，开发 AI 智能答题应用平台。用户只需设定主题，就能通过 AI 快速生成题目、让 AI 分析用户答案，极大降低创建答题应用的成本、提高回答多样性。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723095970141-7f86296c-4de0-4bb9-9222-5045be772fd1.png#averageHue=%23fefdfd&clientId=u38ded80c-8acd-4&from=paste&height=841&id=u1134040a&originHeight=1051&originWidth=1798&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=263185&status=done&style=none&taskId=u494028c5-71d1-4c3c-b1f4-2c01515252b&title=&width=1438.4)

3. 第三阶段，通过多种企业开发技术手段进行 项目优化。包括 RxJava + SSE 优化 AI 生成体验、通过缓存和分库分表优化性能、通过幂等设计和线程池隔离提高系统安全性、通过统计分析和应用分享功能来将应用 “产品化” 等等。

## 项目展示
展示部分页面
用户登录页：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723096096126-1406cc28-ba79-43aa-bf9b-1b12d991d5fe.png#averageHue=%23a4d4ac&clientId=u38ded80c-8acd-4&from=paste&height=885&id=u3da6eefb&originHeight=1106&originWidth=1858&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=1349472&status=done&style=none&taskId=u80c95ec7-305f-445f-a823-e38c6cd7ad6&title=&width=1486.4)

首页：

![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723381533813-37bee559-221c-4267-b0fa-a7fd136729bc.png?x-oss-process=image%2Fformat%2Cwebp%2Fresize%2Cw_937%2Climit_0)

应用详情页：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723096155175-331688a9-e596-498e-9363-de03cf8e188b.png#averageHue=%23faf6f5&clientId=u38ded80c-8acd-4&from=paste&height=546&id=u22edaf66&originHeight=683&originWidth=1847&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=350540&status=done&style=none&taskId=u12f3d324-cadd-4d50-82ed-366819945c3&title=&width=1477.6)

用户答题页：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723096173227-866b4335-889c-44a8-a540-c858a7f0e244.png#averageHue=%23fefefd&clientId=u38ded80c-8acd-4&from=paste&height=439&id=ud40be6c5&originHeight=549&originWidth=1858&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=58835&status=done&style=none&taskId=u33991277-3f04-4bc3-98fb-6a2ef5c16df&title=&width=1486.4)

创建应用页：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723096197736-97123967-a72d-4237-8694-e4a0d2ae804e.png#averageHue=%23fefefd&clientId=u38ded80c-8acd-4&from=paste&height=535&id=u5e27ef31&originHeight=669&originWidth=1857&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=68576&status=done&style=none&taskId=uf3a60ee2-9854-49a5-9258-bb240002c9a&title=&width=1485.6)

应用管理页：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723096269674-7a12037b-3f69-44bf-a828-4503974db47f.png#averageHue=%23d3eac6&clientId=u38ded80c-8acd-4&from=paste&height=754&id=u972db629&originHeight=943&originWidth=1827&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=275866&status=done&style=none&taskId=ued09a028-7e3d-4b69-9cd1-39628cc463d&title=&width=1461.6)

应用分享功能：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723096319204-1f1b1e37-80e8-46d2-9f96-2ea212531de2.png#averageHue=%23535c5f&clientId=u38ded80c-8acd-4&from=paste&height=565&id=u770388ff&originHeight=706&originWidth=1317&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=419371&status=done&style=none&taskId=u99569719-ff0b-478c-9b56-64568f533ad&title=&width=1053.6)



数据统计分析页：

![image](https://cdn.nlark.com/yuque/0/2024/png/35349136/1723381552793-b0f823fb-1be3-4a8c-90ad-604dace1fe75.png?x-oss-process=image%2Fformat%2Cwebp%2Fresize%2Cw_937%2Climit_0)



## 技术选型

### 后端

- Java Spring Boot 开发框架（万用后端模板）
- 存储层：MySQL 数据库 + Redis 缓存 + 腾讯云 COS 对象存储
- MyBatis-Plus 及 MyBatis X 自动生成
- Redisson 分布式锁
- Caffeine 本地缓存
- ⭐️ 基于 ChatGLM 大模型的通用 AI 能力
- ⭐️ RxJava 响应式框架 + 线程池隔离实战
- ⭐️ SSE 服务端推送
- ⭐️ Shardingsphere 分库分表
- ⭐️ 幂等设计 + 分布式 ID 雪花算法
- ⭐️ 多种设计模式
- ⭐️ 多角度项目优化：性能、稳定性、成本优化、产品优化等

### 前端

- React 
- UmiJS 框架
- Axios 请求库
- Arco Design 组件库
- 前端工程化：ESLint + Prettier + TypeScript
- 富文本编辑器
- QRCode.js 二维码生成
- ⭐️ OpenAPI 前端代码生成


