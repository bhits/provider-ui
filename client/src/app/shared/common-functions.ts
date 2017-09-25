
export function getBaseHref(){
  let paths: string[] = location.pathname.split('/').splice(1, 1);
  let basePath: string = (paths && paths[0]);
  if(basePath){
    return '/' + basePath;
  }else{
    throw new Error('Cannot get Base Href.');
  }
}
