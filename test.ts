const makeArr = <T,Y>(x:T, y:Y) => {
    return [x,y];
}
const v = makeArr(1,2);
const v1 = makeArr<number | null, string>(null,'a');

const makeFullName = <T extends { firstName: any, lastName: any }>(obj: T) => {
    return {
        ...obj,
        fullName: obj.firstName + ' ' + obj.lastName
    }
}
const v4 = makeFullName({
    say: 'hi',
    firstName: 'mike',
    lastName: 'dean',
    age: 15
});

interface Tab<T> {
    id:string,
    name: string,
    password: T
}

type NumberTab = Tab<number>;
type StringTab = Tab<string>;
