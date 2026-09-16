export const authConfig = {
  clientId: '170429ae-6f0f-40d9-be90-4b5aa090da50',
  tenantId: '8f8d6934-0bf2-4298-8992-7aca4a2b5648',
  redirectUri: 'http://localhost:4200',
  api: {
    baseUrl: 'http://localhost:5260',
    scopes: ['api://4f560f52-8281-43d4-8796-5230492949c9/access_as_user']
  }
};
export const authority = `https://login.microsoftonline.com/${authConfig.tenantId}`;
