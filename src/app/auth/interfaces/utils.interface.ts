export interface IPais {
    name: IName,
    tld:string[],
    cca2: string,
    ccn3: string,
    independent: boolean,
    status: string,
    unMember: boolean,
    currencies: Currencies,
    idd: IIdd,
    capital: string[],
    altSpellings: string[],
    region: string,
    subregion: string
    
}

export interface IName {
    common: string,
    official: string,
    nativeName:INativeName,
}
export interface INativeName {
    fra:IFra
}
export interface IFra {
    official: string,
    common: string
}
export interface Currencies {
    XPF:IXpf
}
export interface IXpf {
    name:string,
    symbol: string
}
export interface IIdd {
    root: string,
    suffixes: string[]
}