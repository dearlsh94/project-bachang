interface ISubSection {
    title: string,
    url: string,
}

export default interface ISection {
    title: string,
    url: string,
    sub: Array<ISubSection>
}