interface ISubSection {
    key: string,
    title: string,
    url: string,
}

export default interface ISection {
    key: string,
    title: string,
    url: string,
    sub: Array<ISubSection>
}