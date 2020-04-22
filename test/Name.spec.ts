import { Name } from "../src/classes/Name";

describe('Name class', () => {
  it('truncates a long name', () => {
    expect(new Name('ninechars', 'Nm').name).toEqual('ninechar');
    expect(new Name('thiscanbe16charslong', 'SubNm').name).toEqual('thiscanbe16chars');
  })

  it('converts to an encoded array', () => {
    expect(
      new Name('clap', 'Nm').toEncodedArray()
    ).toEqual([99, 108, 97, 112, 0, 0, 0, 0])
    expect(
      new Name('`^long%we1rd', 'Nm').toEncodedArray()
    ).toEqual([96, 94, 108, 111, 110, 103, 37, 119])
  })
})