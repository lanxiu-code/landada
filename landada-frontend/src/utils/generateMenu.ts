/**
 * @name 导航菜单生成
 */
function generateMenu(routes: any[], userAccess: string) {
  return routes.reduce((acc, route) => {
    if (route.routes && !route.hideInMenu) {
      route.routes.forEach((subRoute: any) => {
        if (!subRoute.hideInMenu && subRoute.meta) {
          if (
            subRoute.meta.access.some((access: string) => userAccess == access)
          ) {
            acc.push({ path: subRoute.path, name: subRoute?.meta?.title });
          }
        }
      });
    } else {
      if (!route.hideInMenu && route.meta) {
        if (route.meta.access.some((access: string) => userAccess == access)) {
          acc.push({ path: route.path, name: route?.meta?.title });
        }
      }
    }
    return acc;
  }, []);
}

// 使用函数生成导航菜单
export default generateMenu;
