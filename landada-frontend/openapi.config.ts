const { generateService } = require('@umijs/openapi')

generateService({
  requestLibPath: "import request  from '@/utils/request'",
  schemaPath: 'http://localhost:8101/api/v3/api-docs',
  serversPath: './src/servers',
})