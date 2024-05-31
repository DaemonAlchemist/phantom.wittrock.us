
export const stopPropagation = (f:(e:any) => void) => (e:any) => {
    e.stopPropagation();
    f(e);
}