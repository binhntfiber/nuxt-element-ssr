import type BigNumber from 'bignumber.js'

export type ANumber = number | string | BigNumber

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
}
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type ReturnPromiseType<T extends (...args: any) => any> =
  ReturnType<T> extends Promise<infer F> ? F : ReturnType<T>

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type AntKey = string | number
export interface AntMenuInfo {
  key: AntKey
  eventKey: string
  keyPath?: AntKey[]
  eventKeyPath: string[]
  domEvent: MouseEvent | KeyboardEvent
}
