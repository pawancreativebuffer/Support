
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PortalUser
 * 
 */
export type PortalUser = $Result.DefaultSelection<Prisma.$PortalUserPayload>
/**
 * Model SupportTicket
 * 
 */
export type SupportTicket = $Result.DefaultSelection<Prisma.$SupportTicketPayload>
/**
 * Model TicketMessage
 * 
 */
export type TicketMessage = $Result.DefaultSelection<Prisma.$TicketMessagePayload>
/**
 * Model ChatWidgetSession
 * 
 */
export type ChatWidgetSession = $Result.DefaultSelection<Prisma.$ChatWidgetSessionPayload>
/**
 * Model ChatWidgetMessage
 * 
 */
export type ChatWidgetMessage = $Result.DefaultSelection<Prisma.$ChatWidgetMessagePayload>
/**
 * Model VoiceSessionLog
 * 
 */
export type VoiceSessionLog = $Result.DefaultSelection<Prisma.$VoiceSessionLogPayload>
/**
 * Model CallLog
 * 
 */
export type CallLog = $Result.DefaultSelection<Prisma.$CallLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PortalRole: {
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  CUSTOMER: 'CUSTOMER'
};

export type PortalRole = (typeof PortalRole)[keyof typeof PortalRole]


export const TicketStatus: {
  OPEN: 'OPEN',
  WITH_CLIENT: 'WITH_CLIENT',
  ON_HOLD: 'ON_HOLD',
  ESCALATED: 'ESCALATED',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
  MERGED: 'MERGED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const TicketPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority]


export const WidgetSessionStatus: {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
};

export type WidgetSessionStatus = (typeof WidgetSessionStatus)[keyof typeof WidgetSessionStatus]


export const WidgetSenderType: {
  USER: 'USER',
  AGENT: 'AGENT',
  SYSTEM: 'SYSTEM'
};

export type WidgetSenderType = (typeof WidgetSenderType)[keyof typeof WidgetSenderType]

}

export type PortalRole = $Enums.PortalRole

export const PortalRole: typeof $Enums.PortalRole

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type TicketPriority = $Enums.TicketPriority

export const TicketPriority: typeof $Enums.TicketPriority

export type WidgetSessionStatus = $Enums.WidgetSessionStatus

export const WidgetSessionStatus: typeof $Enums.WidgetSessionStatus

export type WidgetSenderType = $Enums.WidgetSenderType

export const WidgetSenderType: typeof $Enums.WidgetSenderType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PortalUsers
 * const portalUsers = await prisma.portalUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PortalUsers
   * const portalUsers = await prisma.portalUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.portalUser`: Exposes CRUD operations for the **PortalUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortalUsers
    * const portalUsers = await prisma.portalUser.findMany()
    * ```
    */
  get portalUser(): Prisma.PortalUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportTicket`: Exposes CRUD operations for the **SupportTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportTickets
    * const supportTickets = await prisma.supportTicket.findMany()
    * ```
    */
  get supportTicket(): Prisma.SupportTicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticketMessage`: Exposes CRUD operations for the **TicketMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TicketMessages
    * const ticketMessages = await prisma.ticketMessage.findMany()
    * ```
    */
  get ticketMessage(): Prisma.TicketMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatWidgetSession`: Exposes CRUD operations for the **ChatWidgetSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatWidgetSessions
    * const chatWidgetSessions = await prisma.chatWidgetSession.findMany()
    * ```
    */
  get chatWidgetSession(): Prisma.ChatWidgetSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatWidgetMessage`: Exposes CRUD operations for the **ChatWidgetMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatWidgetMessages
    * const chatWidgetMessages = await prisma.chatWidgetMessage.findMany()
    * ```
    */
  get chatWidgetMessage(): Prisma.ChatWidgetMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voiceSessionLog`: Exposes CRUD operations for the **VoiceSessionLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VoiceSessionLogs
    * const voiceSessionLogs = await prisma.voiceSessionLog.findMany()
    * ```
    */
  get voiceSessionLog(): Prisma.VoiceSessionLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.callLog`: Exposes CRUD operations for the **CallLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallLogs
    * const callLogs = await prisma.callLog.findMany()
    * ```
    */
  get callLog(): Prisma.CallLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.2.1
   * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PortalUser: 'PortalUser',
    SupportTicket: 'SupportTicket',
    TicketMessage: 'TicketMessage',
    ChatWidgetSession: 'ChatWidgetSession',
    ChatWidgetMessage: 'ChatWidgetMessage',
    VoiceSessionLog: 'VoiceSessionLog',
    CallLog: 'CallLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "portalUser" | "supportTicket" | "ticketMessage" | "chatWidgetSession" | "chatWidgetMessage" | "voiceSessionLog" | "callLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PortalUser: {
        payload: Prisma.$PortalUserPayload<ExtArgs>
        fields: Prisma.PortalUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortalUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortalUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>
          }
          findFirst: {
            args: Prisma.PortalUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortalUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>
          }
          findMany: {
            args: Prisma.PortalUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>[]
          }
          create: {
            args: Prisma.PortalUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>
          }
          createMany: {
            args: Prisma.PortalUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortalUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>[]
          }
          delete: {
            args: Prisma.PortalUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>
          }
          update: {
            args: Prisma.PortalUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>
          }
          deleteMany: {
            args: Prisma.PortalUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortalUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortalUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>[]
          }
          upsert: {
            args: Prisma.PortalUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalUserPayload>
          }
          aggregate: {
            args: Prisma.PortalUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortalUser>
          }
          groupBy: {
            args: Prisma.PortalUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortalUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortalUserCountArgs<ExtArgs>
            result: $Utils.Optional<PortalUserCountAggregateOutputType> | number
          }
        }
      }
      SupportTicket: {
        payload: Prisma.$SupportTicketPayload<ExtArgs>
        fields: Prisma.SupportTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findFirst: {
            args: Prisma.SupportTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findMany: {
            args: Prisma.SupportTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          create: {
            args: Prisma.SupportTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          createMany: {
            args: Prisma.SupportTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportTicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          delete: {
            args: Prisma.SupportTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          update: {
            args: Prisma.SupportTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          deleteMany: {
            args: Prisma.SupportTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportTicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          upsert: {
            args: Prisma.SupportTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          aggregate: {
            args: Prisma.SupportTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportTicket>
          }
          groupBy: {
            args: Prisma.SupportTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportTicketCountArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketCountAggregateOutputType> | number
          }
        }
      }
      TicketMessage: {
        payload: Prisma.$TicketMessagePayload<ExtArgs>
        fields: Prisma.TicketMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          findFirst: {
            args: Prisma.TicketMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          findMany: {
            args: Prisma.TicketMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>[]
          }
          create: {
            args: Prisma.TicketMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          createMany: {
            args: Prisma.TicketMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>[]
          }
          delete: {
            args: Prisma.TicketMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          update: {
            args: Prisma.TicketMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          deleteMany: {
            args: Prisma.TicketMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>[]
          }
          upsert: {
            args: Prisma.TicketMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          aggregate: {
            args: Prisma.TicketMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicketMessage>
          }
          groupBy: {
            args: Prisma.TicketMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketMessageCountArgs<ExtArgs>
            result: $Utils.Optional<TicketMessageCountAggregateOutputType> | number
          }
        }
      }
      ChatWidgetSession: {
        payload: Prisma.$ChatWidgetSessionPayload<ExtArgs>
        fields: Prisma.ChatWidgetSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatWidgetSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatWidgetSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>
          }
          findFirst: {
            args: Prisma.ChatWidgetSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatWidgetSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>
          }
          findMany: {
            args: Prisma.ChatWidgetSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>[]
          }
          create: {
            args: Prisma.ChatWidgetSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>
          }
          createMany: {
            args: Prisma.ChatWidgetSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatWidgetSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>[]
          }
          delete: {
            args: Prisma.ChatWidgetSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>
          }
          update: {
            args: Prisma.ChatWidgetSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>
          }
          deleteMany: {
            args: Prisma.ChatWidgetSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatWidgetSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatWidgetSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>[]
          }
          upsert: {
            args: Prisma.ChatWidgetSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetSessionPayload>
          }
          aggregate: {
            args: Prisma.ChatWidgetSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatWidgetSession>
          }
          groupBy: {
            args: Prisma.ChatWidgetSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatWidgetSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatWidgetSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ChatWidgetSessionCountAggregateOutputType> | number
          }
        }
      }
      ChatWidgetMessage: {
        payload: Prisma.$ChatWidgetMessagePayload<ExtArgs>
        fields: Prisma.ChatWidgetMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatWidgetMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatWidgetMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>
          }
          findFirst: {
            args: Prisma.ChatWidgetMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatWidgetMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>
          }
          findMany: {
            args: Prisma.ChatWidgetMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>[]
          }
          create: {
            args: Prisma.ChatWidgetMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>
          }
          createMany: {
            args: Prisma.ChatWidgetMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatWidgetMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>[]
          }
          delete: {
            args: Prisma.ChatWidgetMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>
          }
          update: {
            args: Prisma.ChatWidgetMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>
          }
          deleteMany: {
            args: Prisma.ChatWidgetMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatWidgetMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatWidgetMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>[]
          }
          upsert: {
            args: Prisma.ChatWidgetMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatWidgetMessagePayload>
          }
          aggregate: {
            args: Prisma.ChatWidgetMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatWidgetMessage>
          }
          groupBy: {
            args: Prisma.ChatWidgetMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatWidgetMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatWidgetMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ChatWidgetMessageCountAggregateOutputType> | number
          }
        }
      }
      VoiceSessionLog: {
        payload: Prisma.$VoiceSessionLogPayload<ExtArgs>
        fields: Prisma.VoiceSessionLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoiceSessionLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoiceSessionLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>
          }
          findFirst: {
            args: Prisma.VoiceSessionLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoiceSessionLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>
          }
          findMany: {
            args: Prisma.VoiceSessionLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>[]
          }
          create: {
            args: Prisma.VoiceSessionLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>
          }
          createMany: {
            args: Prisma.VoiceSessionLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoiceSessionLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>[]
          }
          delete: {
            args: Prisma.VoiceSessionLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>
          }
          update: {
            args: Prisma.VoiceSessionLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>
          }
          deleteMany: {
            args: Prisma.VoiceSessionLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoiceSessionLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoiceSessionLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>[]
          }
          upsert: {
            args: Prisma.VoiceSessionLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceSessionLogPayload>
          }
          aggregate: {
            args: Prisma.VoiceSessionLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoiceSessionLog>
          }
          groupBy: {
            args: Prisma.VoiceSessionLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoiceSessionLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoiceSessionLogCountArgs<ExtArgs>
            result: $Utils.Optional<VoiceSessionLogCountAggregateOutputType> | number
          }
        }
      }
      CallLog: {
        payload: Prisma.$CallLogPayload<ExtArgs>
        fields: Prisma.CallLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          findFirst: {
            args: Prisma.CallLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          findMany: {
            args: Prisma.CallLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>[]
          }
          create: {
            args: Prisma.CallLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          createMany: {
            args: Prisma.CallLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>[]
          }
          delete: {
            args: Prisma.CallLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          update: {
            args: Prisma.CallLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          deleteMany: {
            args: Prisma.CallLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CallLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>[]
          }
          upsert: {
            args: Prisma.CallLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          aggregate: {
            args: Prisma.CallLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallLog>
          }
          groupBy: {
            args: Prisma.CallLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallLogCountArgs<ExtArgs>
            result: $Utils.Optional<CallLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    portalUser?: PortalUserOmit
    supportTicket?: SupportTicketOmit
    ticketMessage?: TicketMessageOmit
    chatWidgetSession?: ChatWidgetSessionOmit
    chatWidgetMessage?: ChatWidgetMessageOmit
    voiceSessionLog?: VoiceSessionLogOmit
    callLog?: CallLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PortalUserCountOutputType
   */

  export type PortalUserCountOutputType = {
    raisedTickets: number
    assignedTickets: number
    sentMessages: number
    voiceLogs: number
    callLogs: number
  }

  export type PortalUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raisedTickets?: boolean | PortalUserCountOutputTypeCountRaisedTicketsArgs
    assignedTickets?: boolean | PortalUserCountOutputTypeCountAssignedTicketsArgs
    sentMessages?: boolean | PortalUserCountOutputTypeCountSentMessagesArgs
    voiceLogs?: boolean | PortalUserCountOutputTypeCountVoiceLogsArgs
    callLogs?: boolean | PortalUserCountOutputTypeCountCallLogsArgs
  }

  // Custom InputTypes
  /**
   * PortalUserCountOutputType without action
   */
  export type PortalUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUserCountOutputType
     */
    select?: PortalUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PortalUserCountOutputType without action
   */
  export type PortalUserCountOutputTypeCountRaisedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
  }

  /**
   * PortalUserCountOutputType without action
   */
  export type PortalUserCountOutputTypeCountAssignedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
  }

  /**
   * PortalUserCountOutputType without action
   */
  export type PortalUserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketMessageWhereInput
  }

  /**
   * PortalUserCountOutputType without action
   */
  export type PortalUserCountOutputTypeCountVoiceLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoiceSessionLogWhereInput
  }

  /**
   * PortalUserCountOutputType without action
   */
  export type PortalUserCountOutputTypeCountCallLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallLogWhereInput
  }


  /**
   * Count Type SupportTicketCountOutputType
   */

  export type SupportTicketCountOutputType = {
    messages: number
    mergedTickets: number
  }

  export type SupportTicketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | SupportTicketCountOutputTypeCountMessagesArgs
    mergedTickets?: boolean | SupportTicketCountOutputTypeCountMergedTicketsArgs
  }

  // Custom InputTypes
  /**
   * SupportTicketCountOutputType without action
   */
  export type SupportTicketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicketCountOutputType
     */
    select?: SupportTicketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupportTicketCountOutputType without action
   */
  export type SupportTicketCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketMessageWhereInput
  }

  /**
   * SupportTicketCountOutputType without action
   */
  export type SupportTicketCountOutputTypeCountMergedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
  }


  /**
   * Count Type ChatWidgetSessionCountOutputType
   */

  export type ChatWidgetSessionCountOutputType = {
    messages: number
  }

  export type ChatWidgetSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatWidgetSessionCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ChatWidgetSessionCountOutputType without action
   */
  export type ChatWidgetSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSessionCountOutputType
     */
    select?: ChatWidgetSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatWidgetSessionCountOutputType without action
   */
  export type ChatWidgetSessionCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatWidgetMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PortalUser
   */

  export type AggregatePortalUser = {
    _count: PortalUserCountAggregateOutputType | null
    _avg: PortalUserAvgAggregateOutputType | null
    _sum: PortalUserSumAggregateOutputType | null
    _min: PortalUserMinAggregateOutputType | null
    _max: PortalUserMaxAggregateOutputType | null
  }

  export type PortalUserAvgAggregateOutputType = {
    id: number | null
  }

  export type PortalUserSumAggregateOutputType = {
    id: number | null
  }

  export type PortalUserMinAggregateOutputType = {
    id: number | null
    email: string | null
    login: string | null
    firstName: string | null
    lastName: string | null
    passwordHash: string | null
    role: $Enums.PortalRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortalUserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    login: string | null
    firstName: string | null
    lastName: string | null
    passwordHash: string | null
    role: $Enums.PortalRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortalUserCountAggregateOutputType = {
    id: number
    email: number
    login: number
    firstName: number
    lastName: number
    passwordHash: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortalUserAvgAggregateInputType = {
    id?: true
  }

  export type PortalUserSumAggregateInputType = {
    id?: true
  }

  export type PortalUserMinAggregateInputType = {
    id?: true
    email?: true
    login?: true
    firstName?: true
    lastName?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortalUserMaxAggregateInputType = {
    id?: true
    email?: true
    login?: true
    firstName?: true
    lastName?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortalUserCountAggregateInputType = {
    id?: true
    email?: true
    login?: true
    firstName?: true
    lastName?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortalUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalUser to aggregate.
     */
    where?: PortalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalUsers to fetch.
     */
    orderBy?: PortalUserOrderByWithRelationInput | PortalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortalUsers
    **/
    _count?: true | PortalUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortalUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortalUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortalUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortalUserMaxAggregateInputType
  }

  export type GetPortalUserAggregateType<T extends PortalUserAggregateArgs> = {
        [P in keyof T & keyof AggregatePortalUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortalUser[P]>
      : GetScalarType<T[P], AggregatePortalUser[P]>
  }




  export type PortalUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalUserWhereInput
    orderBy?: PortalUserOrderByWithAggregationInput | PortalUserOrderByWithAggregationInput[]
    by: PortalUserScalarFieldEnum[] | PortalUserScalarFieldEnum
    having?: PortalUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortalUserCountAggregateInputType | true
    _avg?: PortalUserAvgAggregateInputType
    _sum?: PortalUserSumAggregateInputType
    _min?: PortalUserMinAggregateInputType
    _max?: PortalUserMaxAggregateInputType
  }

  export type PortalUserGroupByOutputType = {
    id: number
    email: string
    login: string | null
    firstName: string | null
    lastName: string | null
    passwordHash: string
    role: $Enums.PortalRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PortalUserCountAggregateOutputType | null
    _avg: PortalUserAvgAggregateOutputType | null
    _sum: PortalUserSumAggregateOutputType | null
    _min: PortalUserMinAggregateOutputType | null
    _max: PortalUserMaxAggregateOutputType | null
  }

  type GetPortalUserGroupByPayload<T extends PortalUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortalUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortalUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortalUserGroupByOutputType[P]>
            : GetScalarType<T[P], PortalUserGroupByOutputType[P]>
        }
      >
    >


  export type PortalUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    login?: boolean
    firstName?: boolean
    lastName?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    raisedTickets?: boolean | PortalUser$raisedTicketsArgs<ExtArgs>
    assignedTickets?: boolean | PortalUser$assignedTicketsArgs<ExtArgs>
    sentMessages?: boolean | PortalUser$sentMessagesArgs<ExtArgs>
    voiceLogs?: boolean | PortalUser$voiceLogsArgs<ExtArgs>
    callLogs?: boolean | PortalUser$callLogsArgs<ExtArgs>
    _count?: boolean | PortalUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portalUser"]>

  export type PortalUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    login?: boolean
    firstName?: boolean
    lastName?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["portalUser"]>

  export type PortalUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    login?: boolean
    firstName?: boolean
    lastName?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["portalUser"]>

  export type PortalUserSelectScalar = {
    id?: boolean
    email?: boolean
    login?: boolean
    firstName?: boolean
    lastName?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortalUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "login" | "firstName" | "lastName" | "passwordHash" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["portalUser"]>
  export type PortalUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raisedTickets?: boolean | PortalUser$raisedTicketsArgs<ExtArgs>
    assignedTickets?: boolean | PortalUser$assignedTicketsArgs<ExtArgs>
    sentMessages?: boolean | PortalUser$sentMessagesArgs<ExtArgs>
    voiceLogs?: boolean | PortalUser$voiceLogsArgs<ExtArgs>
    callLogs?: boolean | PortalUser$callLogsArgs<ExtArgs>
    _count?: boolean | PortalUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PortalUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PortalUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PortalUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortalUser"
    objects: {
      raisedTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
      assignedTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
      sentMessages: Prisma.$TicketMessagePayload<ExtArgs>[]
      voiceLogs: Prisma.$VoiceSessionLogPayload<ExtArgs>[]
      callLogs: Prisma.$CallLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      login: string | null
      firstName: string | null
      lastName: string | null
      passwordHash: string
      role: $Enums.PortalRole
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portalUser"]>
    composites: {}
  }

  type PortalUserGetPayload<S extends boolean | null | undefined | PortalUserDefaultArgs> = $Result.GetResult<Prisma.$PortalUserPayload, S>

  type PortalUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortalUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortalUserCountAggregateInputType | true
    }

  export interface PortalUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortalUser'], meta: { name: 'PortalUser' } }
    /**
     * Find zero or one PortalUser that matches the filter.
     * @param {PortalUserFindUniqueArgs} args - Arguments to find a PortalUser
     * @example
     * // Get one PortalUser
     * const portalUser = await prisma.portalUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortalUserFindUniqueArgs>(args: SelectSubset<T, PortalUserFindUniqueArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PortalUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortalUserFindUniqueOrThrowArgs} args - Arguments to find a PortalUser
     * @example
     * // Get one PortalUser
     * const portalUser = await prisma.portalUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortalUserFindUniqueOrThrowArgs>(args: SelectSubset<T, PortalUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PortalUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalUserFindFirstArgs} args - Arguments to find a PortalUser
     * @example
     * // Get one PortalUser
     * const portalUser = await prisma.portalUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortalUserFindFirstArgs>(args?: SelectSubset<T, PortalUserFindFirstArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PortalUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalUserFindFirstOrThrowArgs} args - Arguments to find a PortalUser
     * @example
     * // Get one PortalUser
     * const portalUser = await prisma.portalUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortalUserFindFirstOrThrowArgs>(args?: SelectSubset<T, PortalUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PortalUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortalUsers
     * const portalUsers = await prisma.portalUser.findMany()
     * 
     * // Get first 10 PortalUsers
     * const portalUsers = await prisma.portalUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portalUserWithIdOnly = await prisma.portalUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortalUserFindManyArgs>(args?: SelectSubset<T, PortalUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PortalUser.
     * @param {PortalUserCreateArgs} args - Arguments to create a PortalUser.
     * @example
     * // Create one PortalUser
     * const PortalUser = await prisma.portalUser.create({
     *   data: {
     *     // ... data to create a PortalUser
     *   }
     * })
     * 
     */
    create<T extends PortalUserCreateArgs>(args: SelectSubset<T, PortalUserCreateArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PortalUsers.
     * @param {PortalUserCreateManyArgs} args - Arguments to create many PortalUsers.
     * @example
     * // Create many PortalUsers
     * const portalUser = await prisma.portalUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortalUserCreateManyArgs>(args?: SelectSubset<T, PortalUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortalUsers and returns the data saved in the database.
     * @param {PortalUserCreateManyAndReturnArgs} args - Arguments to create many PortalUsers.
     * @example
     * // Create many PortalUsers
     * const portalUser = await prisma.portalUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortalUsers and only return the `id`
     * const portalUserWithIdOnly = await prisma.portalUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortalUserCreateManyAndReturnArgs>(args?: SelectSubset<T, PortalUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PortalUser.
     * @param {PortalUserDeleteArgs} args - Arguments to delete one PortalUser.
     * @example
     * // Delete one PortalUser
     * const PortalUser = await prisma.portalUser.delete({
     *   where: {
     *     // ... filter to delete one PortalUser
     *   }
     * })
     * 
     */
    delete<T extends PortalUserDeleteArgs>(args: SelectSubset<T, PortalUserDeleteArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PortalUser.
     * @param {PortalUserUpdateArgs} args - Arguments to update one PortalUser.
     * @example
     * // Update one PortalUser
     * const portalUser = await prisma.portalUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortalUserUpdateArgs>(args: SelectSubset<T, PortalUserUpdateArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PortalUsers.
     * @param {PortalUserDeleteManyArgs} args - Arguments to filter PortalUsers to delete.
     * @example
     * // Delete a few PortalUsers
     * const { count } = await prisma.portalUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortalUserDeleteManyArgs>(args?: SelectSubset<T, PortalUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortalUsers
     * const portalUser = await prisma.portalUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortalUserUpdateManyArgs>(args: SelectSubset<T, PortalUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalUsers and returns the data updated in the database.
     * @param {PortalUserUpdateManyAndReturnArgs} args - Arguments to update many PortalUsers.
     * @example
     * // Update many PortalUsers
     * const portalUser = await prisma.portalUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PortalUsers and only return the `id`
     * const portalUserWithIdOnly = await prisma.portalUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortalUserUpdateManyAndReturnArgs>(args: SelectSubset<T, PortalUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PortalUser.
     * @param {PortalUserUpsertArgs} args - Arguments to update or create a PortalUser.
     * @example
     * // Update or create a PortalUser
     * const portalUser = await prisma.portalUser.upsert({
     *   create: {
     *     // ... data to create a PortalUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortalUser we want to update
     *   }
     * })
     */
    upsert<T extends PortalUserUpsertArgs>(args: SelectSubset<T, PortalUserUpsertArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PortalUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalUserCountArgs} args - Arguments to filter PortalUsers to count.
     * @example
     * // Count the number of PortalUsers
     * const count = await prisma.portalUser.count({
     *   where: {
     *     // ... the filter for the PortalUsers we want to count
     *   }
     * })
    **/
    count<T extends PortalUserCountArgs>(
      args?: Subset<T, PortalUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortalUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortalUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortalUserAggregateArgs>(args: Subset<T, PortalUserAggregateArgs>): Prisma.PrismaPromise<GetPortalUserAggregateType<T>>

    /**
     * Group by PortalUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortalUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortalUserGroupByArgs['orderBy'] }
        : { orderBy?: PortalUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortalUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortalUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortalUser model
   */
  readonly fields: PortalUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortalUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortalUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    raisedTickets<T extends PortalUser$raisedTicketsArgs<ExtArgs> = {}>(args?: Subset<T, PortalUser$raisedTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    assignedTickets<T extends PortalUser$assignedTicketsArgs<ExtArgs> = {}>(args?: Subset<T, PortalUser$assignedTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    sentMessages<T extends PortalUser$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, PortalUser$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    voiceLogs<T extends PortalUser$voiceLogsArgs<ExtArgs> = {}>(args?: Subset<T, PortalUser$voiceLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    callLogs<T extends PortalUser$callLogsArgs<ExtArgs> = {}>(args?: Subset<T, PortalUser$callLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortalUser model
   */ 
  interface PortalUserFieldRefs {
    readonly id: FieldRef<"PortalUser", 'Int'>
    readonly email: FieldRef<"PortalUser", 'String'>
    readonly login: FieldRef<"PortalUser", 'String'>
    readonly firstName: FieldRef<"PortalUser", 'String'>
    readonly lastName: FieldRef<"PortalUser", 'String'>
    readonly passwordHash: FieldRef<"PortalUser", 'String'>
    readonly role: FieldRef<"PortalUser", 'PortalRole'>
    readonly isActive: FieldRef<"PortalUser", 'Boolean'>
    readonly createdAt: FieldRef<"PortalUser", 'DateTime'>
    readonly updatedAt: FieldRef<"PortalUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortalUser findUnique
   */
  export type PortalUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * Filter, which PortalUser to fetch.
     */
    where: PortalUserWhereUniqueInput
  }

  /**
   * PortalUser findUniqueOrThrow
   */
  export type PortalUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * Filter, which PortalUser to fetch.
     */
    where: PortalUserWhereUniqueInput
  }

  /**
   * PortalUser findFirst
   */
  export type PortalUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * Filter, which PortalUser to fetch.
     */
    where?: PortalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalUsers to fetch.
     */
    orderBy?: PortalUserOrderByWithRelationInput | PortalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalUsers.
     */
    cursor?: PortalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalUsers.
     */
    distinct?: PortalUserScalarFieldEnum | PortalUserScalarFieldEnum[]
  }

  /**
   * PortalUser findFirstOrThrow
   */
  export type PortalUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * Filter, which PortalUser to fetch.
     */
    where?: PortalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalUsers to fetch.
     */
    orderBy?: PortalUserOrderByWithRelationInput | PortalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalUsers.
     */
    cursor?: PortalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalUsers.
     */
    distinct?: PortalUserScalarFieldEnum | PortalUserScalarFieldEnum[]
  }

  /**
   * PortalUser findMany
   */
  export type PortalUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * Filter, which PortalUsers to fetch.
     */
    where?: PortalUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalUsers to fetch.
     */
    orderBy?: PortalUserOrderByWithRelationInput | PortalUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortalUsers.
     */
    cursor?: PortalUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalUsers.
     */
    skip?: number
    distinct?: PortalUserScalarFieldEnum | PortalUserScalarFieldEnum[]
  }

  /**
   * PortalUser create
   */
  export type PortalUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * The data needed to create a PortalUser.
     */
    data: XOR<PortalUserCreateInput, PortalUserUncheckedCreateInput>
  }

  /**
   * PortalUser createMany
   */
  export type PortalUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortalUsers.
     */
    data: PortalUserCreateManyInput | PortalUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalUser createManyAndReturn
   */
  export type PortalUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * The data used to create many PortalUsers.
     */
    data: PortalUserCreateManyInput | PortalUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalUser update
   */
  export type PortalUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * The data needed to update a PortalUser.
     */
    data: XOR<PortalUserUpdateInput, PortalUserUncheckedUpdateInput>
    /**
     * Choose, which PortalUser to update.
     */
    where: PortalUserWhereUniqueInput
  }

  /**
   * PortalUser updateMany
   */
  export type PortalUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortalUsers.
     */
    data: XOR<PortalUserUpdateManyMutationInput, PortalUserUncheckedUpdateManyInput>
    /**
     * Filter which PortalUsers to update
     */
    where?: PortalUserWhereInput
  }

  /**
   * PortalUser updateManyAndReturn
   */
  export type PortalUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * The data used to update PortalUsers.
     */
    data: XOR<PortalUserUpdateManyMutationInput, PortalUserUncheckedUpdateManyInput>
    /**
     * Filter which PortalUsers to update
     */
    where?: PortalUserWhereInput
  }

  /**
   * PortalUser upsert
   */
  export type PortalUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * The filter to search for the PortalUser to update in case it exists.
     */
    where: PortalUserWhereUniqueInput
    /**
     * In case the PortalUser found by the `where` argument doesn't exist, create a new PortalUser with this data.
     */
    create: XOR<PortalUserCreateInput, PortalUserUncheckedCreateInput>
    /**
     * In case the PortalUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortalUserUpdateInput, PortalUserUncheckedUpdateInput>
  }

  /**
   * PortalUser delete
   */
  export type PortalUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    /**
     * Filter which PortalUser to delete.
     */
    where: PortalUserWhereUniqueInput
  }

  /**
   * PortalUser deleteMany
   */
  export type PortalUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalUsers to delete
     */
    where?: PortalUserWhereInput
  }

  /**
   * PortalUser.raisedTickets
   */
  export type PortalUser$raisedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * PortalUser.assignedTickets
   */
  export type PortalUser$assignedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * PortalUser.sentMessages
   */
  export type PortalUser$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    where?: TicketMessageWhereInput
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    cursor?: TicketMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * PortalUser.voiceLogs
   */
  export type PortalUser$voiceLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    where?: VoiceSessionLogWhereInput
    orderBy?: VoiceSessionLogOrderByWithRelationInput | VoiceSessionLogOrderByWithRelationInput[]
    cursor?: VoiceSessionLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoiceSessionLogScalarFieldEnum | VoiceSessionLogScalarFieldEnum[]
  }

  /**
   * PortalUser.callLogs
   */
  export type PortalUser$callLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    where?: CallLogWhereInput
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    cursor?: CallLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * PortalUser without action
   */
  export type PortalUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
  }


  /**
   * Model SupportTicket
   */

  export type AggregateSupportTicket = {
    _count: SupportTicketCountAggregateOutputType | null
    _avg: SupportTicketAvgAggregateOutputType | null
    _sum: SupportTicketSumAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  export type SupportTicketAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
    agentId: number | null
    mergedIntoId: number | null
  }

  export type SupportTicketSumAggregateOutputType = {
    id: number | null
    customerId: number | null
    agentId: number | null
    mergedIntoId: number | null
  }

  export type SupportTicketMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.TicketStatus | null
    priority: $Enums.TicketPriority | null
    attachmentUrl: string | null
    attachmentName: string | null
    createdAt: Date | null
    updatedAt: Date | null
    customerId: number | null
    agentId: number | null
    mergedIntoId: number | null
  }

  export type SupportTicketMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.TicketStatus | null
    priority: $Enums.TicketPriority | null
    attachmentUrl: string | null
    attachmentName: string | null
    createdAt: Date | null
    updatedAt: Date | null
    customerId: number | null
    agentId: number | null
    mergedIntoId: number | null
  }

  export type SupportTicketCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    priority: number
    attachmentUrl: number
    attachmentName: number
    createdAt: number
    updatedAt: number
    customerId: number
    agentId: number
    mergedIntoId: number
    _all: number
  }


  export type SupportTicketAvgAggregateInputType = {
    id?: true
    customerId?: true
    agentId?: true
    mergedIntoId?: true
  }

  export type SupportTicketSumAggregateInputType = {
    id?: true
    customerId?: true
    agentId?: true
    mergedIntoId?: true
  }

  export type SupportTicketMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    attachmentUrl?: true
    attachmentName?: true
    createdAt?: true
    updatedAt?: true
    customerId?: true
    agentId?: true
    mergedIntoId?: true
  }

  export type SupportTicketMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    attachmentUrl?: true
    attachmentName?: true
    createdAt?: true
    updatedAt?: true
    customerId?: true
    agentId?: true
    mergedIntoId?: true
  }

  export type SupportTicketCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    attachmentUrl?: true
    attachmentName?: true
    createdAt?: true
    updatedAt?: true
    customerId?: true
    agentId?: true
    mergedIntoId?: true
    _all?: true
  }

  export type SupportTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTicket to aggregate.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportTickets
    **/
    _count?: true | SupportTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupportTicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupportTicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportTicketMaxAggregateInputType
  }

  export type GetSupportTicketAggregateType<T extends SupportTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportTicket[P]>
      : GetScalarType<T[P], AggregateSupportTicket[P]>
  }




  export type SupportTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithAggregationInput | SupportTicketOrderByWithAggregationInput[]
    by: SupportTicketScalarFieldEnum[] | SupportTicketScalarFieldEnum
    having?: SupportTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportTicketCountAggregateInputType | true
    _avg?: SupportTicketAvgAggregateInputType
    _sum?: SupportTicketSumAggregateInputType
    _min?: SupportTicketMinAggregateInputType
    _max?: SupportTicketMaxAggregateInputType
  }

  export type SupportTicketGroupByOutputType = {
    id: number
    title: string
    description: string
    status: $Enums.TicketStatus
    priority: $Enums.TicketPriority
    attachmentUrl: string | null
    attachmentName: string | null
    createdAt: Date
    updatedAt: Date
    customerId: number
    agentId: number | null
    mergedIntoId: number | null
    _count: SupportTicketCountAggregateOutputType | null
    _avg: SupportTicketAvgAggregateOutputType | null
    _sum: SupportTicketSumAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  type GetSupportTicketGroupByPayload<T extends SupportTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
            : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
        }
      >
    >


  export type SupportTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customerId?: boolean
    agentId?: boolean
    mergedIntoId?: boolean
    customer?: boolean | PortalUserDefaultArgs<ExtArgs>
    agent?: boolean | SupportTicket$agentArgs<ExtArgs>
    messages?: boolean | SupportTicket$messagesArgs<ExtArgs>
    mergedInto?: boolean | SupportTicket$mergedIntoArgs<ExtArgs>
    mergedTickets?: boolean | SupportTicket$mergedTicketsArgs<ExtArgs>
    _count?: boolean | SupportTicketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customerId?: boolean
    agentId?: boolean
    mergedIntoId?: boolean
    customer?: boolean | PortalUserDefaultArgs<ExtArgs>
    agent?: boolean | SupportTicket$agentArgs<ExtArgs>
    mergedInto?: boolean | SupportTicket$mergedIntoArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customerId?: boolean
    agentId?: boolean
    mergedIntoId?: boolean
    customer?: boolean | PortalUserDefaultArgs<ExtArgs>
    agent?: boolean | SupportTicket$agentArgs<ExtArgs>
    mergedInto?: boolean | SupportTicket$mergedIntoArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customerId?: boolean
    agentId?: boolean
    mergedIntoId?: boolean
  }

  export type SupportTicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "priority" | "attachmentUrl" | "attachmentName" | "createdAt" | "updatedAt" | "customerId" | "agentId" | "mergedIntoId", ExtArgs["result"]["supportTicket"]>
  export type SupportTicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | PortalUserDefaultArgs<ExtArgs>
    agent?: boolean | SupportTicket$agentArgs<ExtArgs>
    messages?: boolean | SupportTicket$messagesArgs<ExtArgs>
    mergedInto?: boolean | SupportTicket$mergedIntoArgs<ExtArgs>
    mergedTickets?: boolean | SupportTicket$mergedTicketsArgs<ExtArgs>
    _count?: boolean | SupportTicketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupportTicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | PortalUserDefaultArgs<ExtArgs>
    agent?: boolean | SupportTicket$agentArgs<ExtArgs>
    mergedInto?: boolean | SupportTicket$mergedIntoArgs<ExtArgs>
  }
  export type SupportTicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | PortalUserDefaultArgs<ExtArgs>
    agent?: boolean | SupportTicket$agentArgs<ExtArgs>
    mergedInto?: boolean | SupportTicket$mergedIntoArgs<ExtArgs>
  }

  export type $SupportTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportTicket"
    objects: {
      customer: Prisma.$PortalUserPayload<ExtArgs>
      agent: Prisma.$PortalUserPayload<ExtArgs> | null
      messages: Prisma.$TicketMessagePayload<ExtArgs>[]
      mergedInto: Prisma.$SupportTicketPayload<ExtArgs> | null
      mergedTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      status: $Enums.TicketStatus
      priority: $Enums.TicketPriority
      attachmentUrl: string | null
      attachmentName: string | null
      createdAt: Date
      updatedAt: Date
      customerId: number
      agentId: number | null
      mergedIntoId: number | null
    }, ExtArgs["result"]["supportTicket"]>
    composites: {}
  }

  type SupportTicketGetPayload<S extends boolean | null | undefined | SupportTicketDefaultArgs> = $Result.GetResult<Prisma.$SupportTicketPayload, S>

  type SupportTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportTicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportTicketCountAggregateInputType | true
    }

  export interface SupportTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportTicket'], meta: { name: 'SupportTicket' } }
    /**
     * Find zero or one SupportTicket that matches the filter.
     * @param {SupportTicketFindUniqueArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportTicketFindUniqueArgs>(args: SelectSubset<T, SupportTicketFindUniqueArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one SupportTicket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportTicketFindUniqueOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first SupportTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportTicketFindFirstArgs>(args?: SelectSubset<T, SupportTicketFindFirstArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first SupportTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more SupportTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany()
     * 
     * // Get first 10 SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportTicketFindManyArgs>(args?: SelectSubset<T, SupportTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a SupportTicket.
     * @param {SupportTicketCreateArgs} args - Arguments to create a SupportTicket.
     * @example
     * // Create one SupportTicket
     * const SupportTicket = await prisma.supportTicket.create({
     *   data: {
     *     // ... data to create a SupportTicket
     *   }
     * })
     * 
     */
    create<T extends SupportTicketCreateArgs>(args: SelectSubset<T, SupportTicketCreateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many SupportTickets.
     * @param {SupportTicketCreateManyArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportTicketCreateManyArgs>(args?: SelectSubset<T, SupportTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportTickets and returns the data saved in the database.
     * @param {SupportTicketCreateManyAndReturnArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportTickets and only return the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportTicketCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportTicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a SupportTicket.
     * @param {SupportTicketDeleteArgs} args - Arguments to delete one SupportTicket.
     * @example
     * // Delete one SupportTicket
     * const SupportTicket = await prisma.supportTicket.delete({
     *   where: {
     *     // ... filter to delete one SupportTicket
     *   }
     * })
     * 
     */
    delete<T extends SupportTicketDeleteArgs>(args: SelectSubset<T, SupportTicketDeleteArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one SupportTicket.
     * @param {SupportTicketUpdateArgs} args - Arguments to update one SupportTicket.
     * @example
     * // Update one SupportTicket
     * const supportTicket = await prisma.supportTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportTicketUpdateArgs>(args: SelectSubset<T, SupportTicketUpdateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more SupportTickets.
     * @param {SupportTicketDeleteManyArgs} args - Arguments to filter SupportTickets to delete.
     * @example
     * // Delete a few SupportTickets
     * const { count } = await prisma.supportTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportTicketDeleteManyArgs>(args?: SelectSubset<T, SupportTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportTickets
     * const supportTicket = await prisma.supportTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportTicketUpdateManyArgs>(args: SelectSubset<T, SupportTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportTickets and returns the data updated in the database.
     * @param {SupportTicketUpdateManyAndReturnArgs} args - Arguments to update many SupportTickets.
     * @example
     * // Update many SupportTickets
     * const supportTicket = await prisma.supportTicket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportTickets and only return the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SupportTicketUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportTicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one SupportTicket.
     * @param {SupportTicketUpsertArgs} args - Arguments to update or create a SupportTicket.
     * @example
     * // Update or create a SupportTicket
     * const supportTicket = await prisma.supportTicket.upsert({
     *   create: {
     *     // ... data to create a SupportTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportTicket we want to update
     *   }
     * })
     */
    upsert<T extends SupportTicketUpsertArgs>(args: SelectSubset<T, SupportTicketUpsertArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketCountArgs} args - Arguments to filter SupportTickets to count.
     * @example
     * // Count the number of SupportTickets
     * const count = await prisma.supportTicket.count({
     *   where: {
     *     // ... the filter for the SupportTickets we want to count
     *   }
     * })
    **/
    count<T extends SupportTicketCountArgs>(
      args?: Subset<T, SupportTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupportTicketAggregateArgs>(args: Subset<T, SupportTicketAggregateArgs>): Prisma.PrismaPromise<GetSupportTicketAggregateType<T>>

    /**
     * Group by SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupportTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportTicketGroupByArgs['orderBy'] }
        : { orderBy?: SupportTicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupportTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportTicket model
   */
  readonly fields: SupportTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends PortalUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortalUserDefaultArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    agent<T extends SupportTicket$agentArgs<ExtArgs> = {}>(args?: Subset<T, SupportTicket$agentArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    messages<T extends SupportTicket$messagesArgs<ExtArgs> = {}>(args?: Subset<T, SupportTicket$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    mergedInto<T extends SupportTicket$mergedIntoArgs<ExtArgs> = {}>(args?: Subset<T, SupportTicket$mergedIntoArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    mergedTickets<T extends SupportTicket$mergedTicketsArgs<ExtArgs> = {}>(args?: Subset<T, SupportTicket$mergedTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupportTicket model
   */ 
  interface SupportTicketFieldRefs {
    readonly id: FieldRef<"SupportTicket", 'Int'>
    readonly title: FieldRef<"SupportTicket", 'String'>
    readonly description: FieldRef<"SupportTicket", 'String'>
    readonly status: FieldRef<"SupportTicket", 'TicketStatus'>
    readonly priority: FieldRef<"SupportTicket", 'TicketPriority'>
    readonly attachmentUrl: FieldRef<"SupportTicket", 'String'>
    readonly attachmentName: FieldRef<"SupportTicket", 'String'>
    readonly createdAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly customerId: FieldRef<"SupportTicket", 'Int'>
    readonly agentId: FieldRef<"SupportTicket", 'Int'>
    readonly mergedIntoId: FieldRef<"SupportTicket", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SupportTicket findUnique
   */
  export type SupportTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findUniqueOrThrow
   */
  export type SupportTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findFirst
   */
  export type SupportTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findFirstOrThrow
   */
  export type SupportTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findMany
   */
  export type SupportTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTickets to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket create
   */
  export type SupportTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportTicket.
     */
    data: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
  }

  /**
   * SupportTicket createMany
   */
  export type SupportTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportTicket createManyAndReturn
   */
  export type SupportTicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportTicket update
   */
  export type SupportTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportTicket.
     */
    data: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
    /**
     * Choose, which SupportTicket to update.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket updateMany
   */
  export type SupportTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportTickets.
     */
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyInput>
    /**
     * Filter which SupportTickets to update
     */
    where?: SupportTicketWhereInput
  }

  /**
   * SupportTicket updateManyAndReturn
   */
  export type SupportTicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * The data used to update SupportTickets.
     */
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyInput>
    /**
     * Filter which SupportTickets to update
     */
    where?: SupportTicketWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportTicket upsert
   */
  export type SupportTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportTicket to update in case it exists.
     */
    where: SupportTicketWhereUniqueInput
    /**
     * In case the SupportTicket found by the `where` argument doesn't exist, create a new SupportTicket with this data.
     */
    create: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
    /**
     * In case the SupportTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
  }

  /**
   * SupportTicket delete
   */
  export type SupportTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter which SupportTicket to delete.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket deleteMany
   */
  export type SupportTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTickets to delete
     */
    where?: SupportTicketWhereInput
  }

  /**
   * SupportTicket.agent
   */
  export type SupportTicket$agentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    where?: PortalUserWhereInput
  }

  /**
   * SupportTicket.messages
   */
  export type SupportTicket$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    where?: TicketMessageWhereInput
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    cursor?: TicketMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * SupportTicket.mergedInto
   */
  export type SupportTicket$mergedIntoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
  }

  /**
   * SupportTicket.mergedTickets
   */
  export type SupportTicket$mergedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket without action
   */
  export type SupportTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
  }


  /**
   * Model TicketMessage
   */

  export type AggregateTicketMessage = {
    _count: TicketMessageCountAggregateOutputType | null
    _avg: TicketMessageAvgAggregateOutputType | null
    _sum: TicketMessageSumAggregateOutputType | null
    _min: TicketMessageMinAggregateOutputType | null
    _max: TicketMessageMaxAggregateOutputType | null
  }

  export type TicketMessageAvgAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
  }

  export type TicketMessageSumAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
  }

  export type TicketMessageMinAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
    text: string | null
    attachmentUrl: string | null
    attachmentName: string | null
    isSystem: boolean | null
    createdAt: Date | null
  }

  export type TicketMessageMaxAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
    text: string | null
    attachmentUrl: string | null
    attachmentName: string | null
    isSystem: boolean | null
    createdAt: Date | null
  }

  export type TicketMessageCountAggregateOutputType = {
    id: number
    ticketId: number
    senderId: number
    text: number
    attachmentUrl: number
    attachmentName: number
    isSystem: number
    createdAt: number
    _all: number
  }


  export type TicketMessageAvgAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
  }

  export type TicketMessageSumAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
  }

  export type TicketMessageMinAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
    text?: true
    attachmentUrl?: true
    attachmentName?: true
    isSystem?: true
    createdAt?: true
  }

  export type TicketMessageMaxAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
    text?: true
    attachmentUrl?: true
    attachmentName?: true
    isSystem?: true
    createdAt?: true
  }

  export type TicketMessageCountAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
    text?: true
    attachmentUrl?: true
    attachmentName?: true
    isSystem?: true
    createdAt?: true
    _all?: true
  }

  export type TicketMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketMessage to aggregate.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TicketMessages
    **/
    _count?: true | TicketMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMessageMaxAggregateInputType
  }

  export type GetTicketMessageAggregateType<T extends TicketMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateTicketMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicketMessage[P]>
      : GetScalarType<T[P], AggregateTicketMessage[P]>
  }




  export type TicketMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketMessageWhereInput
    orderBy?: TicketMessageOrderByWithAggregationInput | TicketMessageOrderByWithAggregationInput[]
    by: TicketMessageScalarFieldEnum[] | TicketMessageScalarFieldEnum
    having?: TicketMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketMessageCountAggregateInputType | true
    _avg?: TicketMessageAvgAggregateInputType
    _sum?: TicketMessageSumAggregateInputType
    _min?: TicketMessageMinAggregateInputType
    _max?: TicketMessageMaxAggregateInputType
  }

  export type TicketMessageGroupByOutputType = {
    id: number
    ticketId: number
    senderId: number
    text: string
    attachmentUrl: string | null
    attachmentName: string | null
    isSystem: boolean
    createdAt: Date
    _count: TicketMessageCountAggregateOutputType | null
    _avg: TicketMessageAvgAggregateOutputType | null
    _sum: TicketMessageSumAggregateOutputType | null
    _min: TicketMessageMinAggregateOutputType | null
    _max: TicketMessageMaxAggregateOutputType | null
  }

  type GetTicketMessageGroupByPayload<T extends TicketMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketMessageGroupByOutputType[P]>
            : GetScalarType<T[P], TicketMessageGroupByOutputType[P]>
        }
      >
    >


  export type TicketMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    text?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    isSystem?: boolean
    createdAt?: boolean
    ticket?: boolean | SupportTicketDefaultArgs<ExtArgs>
    sender?: boolean | PortalUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketMessage"]>

  export type TicketMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    text?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    isSystem?: boolean
    createdAt?: boolean
    ticket?: boolean | SupportTicketDefaultArgs<ExtArgs>
    sender?: boolean | PortalUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketMessage"]>

  export type TicketMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    text?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    isSystem?: boolean
    createdAt?: boolean
    ticket?: boolean | SupportTicketDefaultArgs<ExtArgs>
    sender?: boolean | PortalUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketMessage"]>

  export type TicketMessageSelectScalar = {
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    text?: boolean
    attachmentUrl?: boolean
    attachmentName?: boolean
    isSystem?: boolean
    createdAt?: boolean
  }

  export type TicketMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketId" | "senderId" | "text" | "attachmentUrl" | "attachmentName" | "isSystem" | "createdAt", ExtArgs["result"]["ticketMessage"]>
  export type TicketMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | SupportTicketDefaultArgs<ExtArgs>
    sender?: boolean | PortalUserDefaultArgs<ExtArgs>
  }
  export type TicketMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | SupportTicketDefaultArgs<ExtArgs>
    sender?: boolean | PortalUserDefaultArgs<ExtArgs>
  }
  export type TicketMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | SupportTicketDefaultArgs<ExtArgs>
    sender?: boolean | PortalUserDefaultArgs<ExtArgs>
  }

  export type $TicketMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TicketMessage"
    objects: {
      ticket: Prisma.$SupportTicketPayload<ExtArgs>
      sender: Prisma.$PortalUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ticketId: number
      senderId: number
      text: string
      attachmentUrl: string | null
      attachmentName: string | null
      isSystem: boolean
      createdAt: Date
    }, ExtArgs["result"]["ticketMessage"]>
    composites: {}
  }

  type TicketMessageGetPayload<S extends boolean | null | undefined | TicketMessageDefaultArgs> = $Result.GetResult<Prisma.$TicketMessagePayload, S>

  type TicketMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketMessageCountAggregateInputType | true
    }

  export interface TicketMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TicketMessage'], meta: { name: 'TicketMessage' } }
    /**
     * Find zero or one TicketMessage that matches the filter.
     * @param {TicketMessageFindUniqueArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketMessageFindUniqueArgs>(args: SelectSubset<T, TicketMessageFindUniqueArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one TicketMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketMessageFindUniqueOrThrowArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first TicketMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageFindFirstArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketMessageFindFirstArgs>(args?: SelectSubset<T, TicketMessageFindFirstArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first TicketMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageFindFirstOrThrowArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more TicketMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TicketMessages
     * const ticketMessages = await prisma.ticketMessage.findMany()
     * 
     * // Get first 10 TicketMessages
     * const ticketMessages = await prisma.ticketMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketMessageWithIdOnly = await prisma.ticketMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketMessageFindManyArgs>(args?: SelectSubset<T, TicketMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a TicketMessage.
     * @param {TicketMessageCreateArgs} args - Arguments to create a TicketMessage.
     * @example
     * // Create one TicketMessage
     * const TicketMessage = await prisma.ticketMessage.create({
     *   data: {
     *     // ... data to create a TicketMessage
     *   }
     * })
     * 
     */
    create<T extends TicketMessageCreateArgs>(args: SelectSubset<T, TicketMessageCreateArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many TicketMessages.
     * @param {TicketMessageCreateManyArgs} args - Arguments to create many TicketMessages.
     * @example
     * // Create many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketMessageCreateManyArgs>(args?: SelectSubset<T, TicketMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TicketMessages and returns the data saved in the database.
     * @param {TicketMessageCreateManyAndReturnArgs} args - Arguments to create many TicketMessages.
     * @example
     * // Create many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TicketMessages and only return the `id`
     * const ticketMessageWithIdOnly = await prisma.ticketMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a TicketMessage.
     * @param {TicketMessageDeleteArgs} args - Arguments to delete one TicketMessage.
     * @example
     * // Delete one TicketMessage
     * const TicketMessage = await prisma.ticketMessage.delete({
     *   where: {
     *     // ... filter to delete one TicketMessage
     *   }
     * })
     * 
     */
    delete<T extends TicketMessageDeleteArgs>(args: SelectSubset<T, TicketMessageDeleteArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one TicketMessage.
     * @param {TicketMessageUpdateArgs} args - Arguments to update one TicketMessage.
     * @example
     * // Update one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketMessageUpdateArgs>(args: SelectSubset<T, TicketMessageUpdateArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more TicketMessages.
     * @param {TicketMessageDeleteManyArgs} args - Arguments to filter TicketMessages to delete.
     * @example
     * // Delete a few TicketMessages
     * const { count } = await prisma.ticketMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketMessageDeleteManyArgs>(args?: SelectSubset<T, TicketMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketMessageUpdateManyArgs>(args: SelectSubset<T, TicketMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketMessages and returns the data updated in the database.
     * @param {TicketMessageUpdateManyAndReturnArgs} args - Arguments to update many TicketMessages.
     * @example
     * // Update many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TicketMessages and only return the `id`
     * const ticketMessageWithIdOnly = await prisma.ticketMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one TicketMessage.
     * @param {TicketMessageUpsertArgs} args - Arguments to update or create a TicketMessage.
     * @example
     * // Update or create a TicketMessage
     * const ticketMessage = await prisma.ticketMessage.upsert({
     *   create: {
     *     // ... data to create a TicketMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TicketMessage we want to update
     *   }
     * })
     */
    upsert<T extends TicketMessageUpsertArgs>(args: SelectSubset<T, TicketMessageUpsertArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of TicketMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageCountArgs} args - Arguments to filter TicketMessages to count.
     * @example
     * // Count the number of TicketMessages
     * const count = await prisma.ticketMessage.count({
     *   where: {
     *     // ... the filter for the TicketMessages we want to count
     *   }
     * })
    **/
    count<T extends TicketMessageCountArgs>(
      args?: Subset<T, TicketMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TicketMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketMessageAggregateArgs>(args: Subset<T, TicketMessageAggregateArgs>): Prisma.PrismaPromise<GetTicketMessageAggregateType<T>>

    /**
     * Group by TicketMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketMessageGroupByArgs['orderBy'] }
        : { orderBy?: TicketMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TicketMessage model
   */
  readonly fields: TicketMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TicketMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticket<T extends SupportTicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupportTicketDefaultArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    sender<T extends PortalUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortalUserDefaultArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TicketMessage model
   */ 
  interface TicketMessageFieldRefs {
    readonly id: FieldRef<"TicketMessage", 'Int'>
    readonly ticketId: FieldRef<"TicketMessage", 'Int'>
    readonly senderId: FieldRef<"TicketMessage", 'Int'>
    readonly text: FieldRef<"TicketMessage", 'String'>
    readonly attachmentUrl: FieldRef<"TicketMessage", 'String'>
    readonly attachmentName: FieldRef<"TicketMessage", 'String'>
    readonly isSystem: FieldRef<"TicketMessage", 'Boolean'>
    readonly createdAt: FieldRef<"TicketMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TicketMessage findUnique
   */
  export type TicketMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage findUniqueOrThrow
   */
  export type TicketMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage findFirst
   */
  export type TicketMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketMessages.
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketMessages.
     */
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * TicketMessage findFirstOrThrow
   */
  export type TicketMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketMessages.
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketMessages.
     */
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * TicketMessage findMany
   */
  export type TicketMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessages to fetch.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TicketMessages.
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * TicketMessage create
   */
  export type TicketMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a TicketMessage.
     */
    data: XOR<TicketMessageCreateInput, TicketMessageUncheckedCreateInput>
  }

  /**
   * TicketMessage createMany
   */
  export type TicketMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TicketMessages.
     */
    data: TicketMessageCreateManyInput | TicketMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TicketMessage createManyAndReturn
   */
  export type TicketMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * The data used to create many TicketMessages.
     */
    data: TicketMessageCreateManyInput | TicketMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketMessage update
   */
  export type TicketMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a TicketMessage.
     */
    data: XOR<TicketMessageUpdateInput, TicketMessageUncheckedUpdateInput>
    /**
     * Choose, which TicketMessage to update.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage updateMany
   */
  export type TicketMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TicketMessages.
     */
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyInput>
    /**
     * Filter which TicketMessages to update
     */
    where?: TicketMessageWhereInput
  }

  /**
   * TicketMessage updateManyAndReturn
   */
  export type TicketMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * The data used to update TicketMessages.
     */
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyInput>
    /**
     * Filter which TicketMessages to update
     */
    where?: TicketMessageWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketMessage upsert
   */
  export type TicketMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the TicketMessage to update in case it exists.
     */
    where: TicketMessageWhereUniqueInput
    /**
     * In case the TicketMessage found by the `where` argument doesn't exist, create a new TicketMessage with this data.
     */
    create: XOR<TicketMessageCreateInput, TicketMessageUncheckedCreateInput>
    /**
     * In case the TicketMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketMessageUpdateInput, TicketMessageUncheckedUpdateInput>
  }

  /**
   * TicketMessage delete
   */
  export type TicketMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter which TicketMessage to delete.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage deleteMany
   */
  export type TicketMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketMessages to delete
     */
    where?: TicketMessageWhereInput
  }

  /**
   * TicketMessage without action
   */
  export type TicketMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
  }


  /**
   * Model ChatWidgetSession
   */

  export type AggregateChatWidgetSession = {
    _count: ChatWidgetSessionCountAggregateOutputType | null
    _avg: ChatWidgetSessionAvgAggregateOutputType | null
    _sum: ChatWidgetSessionSumAggregateOutputType | null
    _min: ChatWidgetSessionMinAggregateOutputType | null
    _max: ChatWidgetSessionMaxAggregateOutputType | null
  }

  export type ChatWidgetSessionAvgAggregateOutputType = {
    id: number | null
  }

  export type ChatWidgetSessionSumAggregateOutputType = {
    id: number | null
  }

  export type ChatWidgetSessionMinAggregateOutputType = {
    id: number | null
    sessionKey: string | null
    customerName: string | null
    customerEmail: string | null
    status: $Enums.WidgetSessionStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatWidgetSessionMaxAggregateOutputType = {
    id: number | null
    sessionKey: string | null
    customerName: string | null
    customerEmail: string | null
    status: $Enums.WidgetSessionStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatWidgetSessionCountAggregateOutputType = {
    id: number
    sessionKey: number
    customerName: number
    customerEmail: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatWidgetSessionAvgAggregateInputType = {
    id?: true
  }

  export type ChatWidgetSessionSumAggregateInputType = {
    id?: true
  }

  export type ChatWidgetSessionMinAggregateInputType = {
    id?: true
    sessionKey?: true
    customerName?: true
    customerEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatWidgetSessionMaxAggregateInputType = {
    id?: true
    sessionKey?: true
    customerName?: true
    customerEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatWidgetSessionCountAggregateInputType = {
    id?: true
    sessionKey?: true
    customerName?: true
    customerEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatWidgetSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatWidgetSession to aggregate.
     */
    where?: ChatWidgetSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetSessions to fetch.
     */
    orderBy?: ChatWidgetSessionOrderByWithRelationInput | ChatWidgetSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatWidgetSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatWidgetSessions
    **/
    _count?: true | ChatWidgetSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatWidgetSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatWidgetSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatWidgetSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatWidgetSessionMaxAggregateInputType
  }

  export type GetChatWidgetSessionAggregateType<T extends ChatWidgetSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateChatWidgetSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatWidgetSession[P]>
      : GetScalarType<T[P], AggregateChatWidgetSession[P]>
  }




  export type ChatWidgetSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatWidgetSessionWhereInput
    orderBy?: ChatWidgetSessionOrderByWithAggregationInput | ChatWidgetSessionOrderByWithAggregationInput[]
    by: ChatWidgetSessionScalarFieldEnum[] | ChatWidgetSessionScalarFieldEnum
    having?: ChatWidgetSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatWidgetSessionCountAggregateInputType | true
    _avg?: ChatWidgetSessionAvgAggregateInputType
    _sum?: ChatWidgetSessionSumAggregateInputType
    _min?: ChatWidgetSessionMinAggregateInputType
    _max?: ChatWidgetSessionMaxAggregateInputType
  }

  export type ChatWidgetSessionGroupByOutputType = {
    id: number
    sessionKey: string
    customerName: string | null
    customerEmail: string | null
    status: $Enums.WidgetSessionStatus
    createdAt: Date
    updatedAt: Date
    _count: ChatWidgetSessionCountAggregateOutputType | null
    _avg: ChatWidgetSessionAvgAggregateOutputType | null
    _sum: ChatWidgetSessionSumAggregateOutputType | null
    _min: ChatWidgetSessionMinAggregateOutputType | null
    _max: ChatWidgetSessionMaxAggregateOutputType | null
  }

  type GetChatWidgetSessionGroupByPayload<T extends ChatWidgetSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatWidgetSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatWidgetSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatWidgetSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ChatWidgetSessionGroupByOutputType[P]>
        }
      >
    >


  export type ChatWidgetSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionKey?: boolean
    customerName?: boolean
    customerEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | ChatWidgetSession$messagesArgs<ExtArgs>
    _count?: boolean | ChatWidgetSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatWidgetSession"]>

  export type ChatWidgetSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionKey?: boolean
    customerName?: boolean
    customerEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatWidgetSession"]>

  export type ChatWidgetSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionKey?: boolean
    customerName?: boolean
    customerEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatWidgetSession"]>

  export type ChatWidgetSessionSelectScalar = {
    id?: boolean
    sessionKey?: boolean
    customerName?: boolean
    customerEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatWidgetSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionKey" | "customerName" | "customerEmail" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["chatWidgetSession"]>
  export type ChatWidgetSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatWidgetSession$messagesArgs<ExtArgs>
    _count?: boolean | ChatWidgetSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatWidgetSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChatWidgetSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChatWidgetSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatWidgetSession"
    objects: {
      messages: Prisma.$ChatWidgetMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sessionKey: string
      customerName: string | null
      customerEmail: string | null
      status: $Enums.WidgetSessionStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chatWidgetSession"]>
    composites: {}
  }

  type ChatWidgetSessionGetPayload<S extends boolean | null | undefined | ChatWidgetSessionDefaultArgs> = $Result.GetResult<Prisma.$ChatWidgetSessionPayload, S>

  type ChatWidgetSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatWidgetSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatWidgetSessionCountAggregateInputType | true
    }

  export interface ChatWidgetSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatWidgetSession'], meta: { name: 'ChatWidgetSession' } }
    /**
     * Find zero or one ChatWidgetSession that matches the filter.
     * @param {ChatWidgetSessionFindUniqueArgs} args - Arguments to find a ChatWidgetSession
     * @example
     * // Get one ChatWidgetSession
     * const chatWidgetSession = await prisma.chatWidgetSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatWidgetSessionFindUniqueArgs>(args: SelectSubset<T, ChatWidgetSessionFindUniqueArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ChatWidgetSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatWidgetSessionFindUniqueOrThrowArgs} args - Arguments to find a ChatWidgetSession
     * @example
     * // Get one ChatWidgetSession
     * const chatWidgetSession = await prisma.chatWidgetSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatWidgetSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatWidgetSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ChatWidgetSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetSessionFindFirstArgs} args - Arguments to find a ChatWidgetSession
     * @example
     * // Get one ChatWidgetSession
     * const chatWidgetSession = await prisma.chatWidgetSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatWidgetSessionFindFirstArgs>(args?: SelectSubset<T, ChatWidgetSessionFindFirstArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ChatWidgetSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetSessionFindFirstOrThrowArgs} args - Arguments to find a ChatWidgetSession
     * @example
     * // Get one ChatWidgetSession
     * const chatWidgetSession = await prisma.chatWidgetSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatWidgetSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatWidgetSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ChatWidgetSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatWidgetSessions
     * const chatWidgetSessions = await prisma.chatWidgetSession.findMany()
     * 
     * // Get first 10 ChatWidgetSessions
     * const chatWidgetSessions = await prisma.chatWidgetSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWidgetSessionWithIdOnly = await prisma.chatWidgetSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatWidgetSessionFindManyArgs>(args?: SelectSubset<T, ChatWidgetSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ChatWidgetSession.
     * @param {ChatWidgetSessionCreateArgs} args - Arguments to create a ChatWidgetSession.
     * @example
     * // Create one ChatWidgetSession
     * const ChatWidgetSession = await prisma.chatWidgetSession.create({
     *   data: {
     *     // ... data to create a ChatWidgetSession
     *   }
     * })
     * 
     */
    create<T extends ChatWidgetSessionCreateArgs>(args: SelectSubset<T, ChatWidgetSessionCreateArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ChatWidgetSessions.
     * @param {ChatWidgetSessionCreateManyArgs} args - Arguments to create many ChatWidgetSessions.
     * @example
     * // Create many ChatWidgetSessions
     * const chatWidgetSession = await prisma.chatWidgetSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatWidgetSessionCreateManyArgs>(args?: SelectSubset<T, ChatWidgetSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatWidgetSessions and returns the data saved in the database.
     * @param {ChatWidgetSessionCreateManyAndReturnArgs} args - Arguments to create many ChatWidgetSessions.
     * @example
     * // Create many ChatWidgetSessions
     * const chatWidgetSession = await prisma.chatWidgetSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatWidgetSessions and only return the `id`
     * const chatWidgetSessionWithIdOnly = await prisma.chatWidgetSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatWidgetSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatWidgetSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ChatWidgetSession.
     * @param {ChatWidgetSessionDeleteArgs} args - Arguments to delete one ChatWidgetSession.
     * @example
     * // Delete one ChatWidgetSession
     * const ChatWidgetSession = await prisma.chatWidgetSession.delete({
     *   where: {
     *     // ... filter to delete one ChatWidgetSession
     *   }
     * })
     * 
     */
    delete<T extends ChatWidgetSessionDeleteArgs>(args: SelectSubset<T, ChatWidgetSessionDeleteArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ChatWidgetSession.
     * @param {ChatWidgetSessionUpdateArgs} args - Arguments to update one ChatWidgetSession.
     * @example
     * // Update one ChatWidgetSession
     * const chatWidgetSession = await prisma.chatWidgetSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatWidgetSessionUpdateArgs>(args: SelectSubset<T, ChatWidgetSessionUpdateArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ChatWidgetSessions.
     * @param {ChatWidgetSessionDeleteManyArgs} args - Arguments to filter ChatWidgetSessions to delete.
     * @example
     * // Delete a few ChatWidgetSessions
     * const { count } = await prisma.chatWidgetSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatWidgetSessionDeleteManyArgs>(args?: SelectSubset<T, ChatWidgetSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatWidgetSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatWidgetSessions
     * const chatWidgetSession = await prisma.chatWidgetSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatWidgetSessionUpdateManyArgs>(args: SelectSubset<T, ChatWidgetSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatWidgetSessions and returns the data updated in the database.
     * @param {ChatWidgetSessionUpdateManyAndReturnArgs} args - Arguments to update many ChatWidgetSessions.
     * @example
     * // Update many ChatWidgetSessions
     * const chatWidgetSession = await prisma.chatWidgetSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatWidgetSessions and only return the `id`
     * const chatWidgetSessionWithIdOnly = await prisma.chatWidgetSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatWidgetSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatWidgetSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ChatWidgetSession.
     * @param {ChatWidgetSessionUpsertArgs} args - Arguments to update or create a ChatWidgetSession.
     * @example
     * // Update or create a ChatWidgetSession
     * const chatWidgetSession = await prisma.chatWidgetSession.upsert({
     *   create: {
     *     // ... data to create a ChatWidgetSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatWidgetSession we want to update
     *   }
     * })
     */
    upsert<T extends ChatWidgetSessionUpsertArgs>(args: SelectSubset<T, ChatWidgetSessionUpsertArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ChatWidgetSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetSessionCountArgs} args - Arguments to filter ChatWidgetSessions to count.
     * @example
     * // Count the number of ChatWidgetSessions
     * const count = await prisma.chatWidgetSession.count({
     *   where: {
     *     // ... the filter for the ChatWidgetSessions we want to count
     *   }
     * })
    **/
    count<T extends ChatWidgetSessionCountArgs>(
      args?: Subset<T, ChatWidgetSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatWidgetSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatWidgetSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatWidgetSessionAggregateArgs>(args: Subset<T, ChatWidgetSessionAggregateArgs>): Prisma.PrismaPromise<GetChatWidgetSessionAggregateType<T>>

    /**
     * Group by ChatWidgetSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatWidgetSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatWidgetSessionGroupByArgs['orderBy'] }
        : { orderBy?: ChatWidgetSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatWidgetSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatWidgetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatWidgetSession model
   */
  readonly fields: ChatWidgetSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatWidgetSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatWidgetSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends ChatWidgetSession$messagesArgs<ExtArgs> = {}>(args?: Subset<T, ChatWidgetSession$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatWidgetSession model
   */ 
  interface ChatWidgetSessionFieldRefs {
    readonly id: FieldRef<"ChatWidgetSession", 'Int'>
    readonly sessionKey: FieldRef<"ChatWidgetSession", 'String'>
    readonly customerName: FieldRef<"ChatWidgetSession", 'String'>
    readonly customerEmail: FieldRef<"ChatWidgetSession", 'String'>
    readonly status: FieldRef<"ChatWidgetSession", 'WidgetSessionStatus'>
    readonly createdAt: FieldRef<"ChatWidgetSession", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatWidgetSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatWidgetSession findUnique
   */
  export type ChatWidgetSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetSession to fetch.
     */
    where: ChatWidgetSessionWhereUniqueInput
  }

  /**
   * ChatWidgetSession findUniqueOrThrow
   */
  export type ChatWidgetSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetSession to fetch.
     */
    where: ChatWidgetSessionWhereUniqueInput
  }

  /**
   * ChatWidgetSession findFirst
   */
  export type ChatWidgetSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetSession to fetch.
     */
    where?: ChatWidgetSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetSessions to fetch.
     */
    orderBy?: ChatWidgetSessionOrderByWithRelationInput | ChatWidgetSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatWidgetSessions.
     */
    cursor?: ChatWidgetSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatWidgetSessions.
     */
    distinct?: ChatWidgetSessionScalarFieldEnum | ChatWidgetSessionScalarFieldEnum[]
  }

  /**
   * ChatWidgetSession findFirstOrThrow
   */
  export type ChatWidgetSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetSession to fetch.
     */
    where?: ChatWidgetSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetSessions to fetch.
     */
    orderBy?: ChatWidgetSessionOrderByWithRelationInput | ChatWidgetSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatWidgetSessions.
     */
    cursor?: ChatWidgetSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatWidgetSessions.
     */
    distinct?: ChatWidgetSessionScalarFieldEnum | ChatWidgetSessionScalarFieldEnum[]
  }

  /**
   * ChatWidgetSession findMany
   */
  export type ChatWidgetSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetSessions to fetch.
     */
    where?: ChatWidgetSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetSessions to fetch.
     */
    orderBy?: ChatWidgetSessionOrderByWithRelationInput | ChatWidgetSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatWidgetSessions.
     */
    cursor?: ChatWidgetSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetSessions.
     */
    skip?: number
    distinct?: ChatWidgetSessionScalarFieldEnum | ChatWidgetSessionScalarFieldEnum[]
  }

  /**
   * ChatWidgetSession create
   */
  export type ChatWidgetSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatWidgetSession.
     */
    data: XOR<ChatWidgetSessionCreateInput, ChatWidgetSessionUncheckedCreateInput>
  }

  /**
   * ChatWidgetSession createMany
   */
  export type ChatWidgetSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatWidgetSessions.
     */
    data: ChatWidgetSessionCreateManyInput | ChatWidgetSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatWidgetSession createManyAndReturn
   */
  export type ChatWidgetSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * The data used to create many ChatWidgetSessions.
     */
    data: ChatWidgetSessionCreateManyInput | ChatWidgetSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatWidgetSession update
   */
  export type ChatWidgetSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatWidgetSession.
     */
    data: XOR<ChatWidgetSessionUpdateInput, ChatWidgetSessionUncheckedUpdateInput>
    /**
     * Choose, which ChatWidgetSession to update.
     */
    where: ChatWidgetSessionWhereUniqueInput
  }

  /**
   * ChatWidgetSession updateMany
   */
  export type ChatWidgetSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatWidgetSessions.
     */
    data: XOR<ChatWidgetSessionUpdateManyMutationInput, ChatWidgetSessionUncheckedUpdateManyInput>
    /**
     * Filter which ChatWidgetSessions to update
     */
    where?: ChatWidgetSessionWhereInput
  }

  /**
   * ChatWidgetSession updateManyAndReturn
   */
  export type ChatWidgetSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * The data used to update ChatWidgetSessions.
     */
    data: XOR<ChatWidgetSessionUpdateManyMutationInput, ChatWidgetSessionUncheckedUpdateManyInput>
    /**
     * Filter which ChatWidgetSessions to update
     */
    where?: ChatWidgetSessionWhereInput
  }

  /**
   * ChatWidgetSession upsert
   */
  export type ChatWidgetSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatWidgetSession to update in case it exists.
     */
    where: ChatWidgetSessionWhereUniqueInput
    /**
     * In case the ChatWidgetSession found by the `where` argument doesn't exist, create a new ChatWidgetSession with this data.
     */
    create: XOR<ChatWidgetSessionCreateInput, ChatWidgetSessionUncheckedCreateInput>
    /**
     * In case the ChatWidgetSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatWidgetSessionUpdateInput, ChatWidgetSessionUncheckedUpdateInput>
  }

  /**
   * ChatWidgetSession delete
   */
  export type ChatWidgetSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
    /**
     * Filter which ChatWidgetSession to delete.
     */
    where: ChatWidgetSessionWhereUniqueInput
  }

  /**
   * ChatWidgetSession deleteMany
   */
  export type ChatWidgetSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatWidgetSessions to delete
     */
    where?: ChatWidgetSessionWhereInput
  }

  /**
   * ChatWidgetSession.messages
   */
  export type ChatWidgetSession$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    where?: ChatWidgetMessageWhereInput
    orderBy?: ChatWidgetMessageOrderByWithRelationInput | ChatWidgetMessageOrderByWithRelationInput[]
    cursor?: ChatWidgetMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatWidgetMessageScalarFieldEnum | ChatWidgetMessageScalarFieldEnum[]
  }

  /**
   * ChatWidgetSession without action
   */
  export type ChatWidgetSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetSession
     */
    select?: ChatWidgetSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetSession
     */
    omit?: ChatWidgetSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetSessionInclude<ExtArgs> | null
  }


  /**
   * Model ChatWidgetMessage
   */

  export type AggregateChatWidgetMessage = {
    _count: ChatWidgetMessageCountAggregateOutputType | null
    _avg: ChatWidgetMessageAvgAggregateOutputType | null
    _sum: ChatWidgetMessageSumAggregateOutputType | null
    _min: ChatWidgetMessageMinAggregateOutputType | null
    _max: ChatWidgetMessageMaxAggregateOutputType | null
  }

  export type ChatWidgetMessageAvgAggregateOutputType = {
    id: number | null
    sessionId: number | null
  }

  export type ChatWidgetMessageSumAggregateOutputType = {
    id: number | null
    sessionId: number | null
  }

  export type ChatWidgetMessageMinAggregateOutputType = {
    id: number | null
    sessionId: number | null
    senderType: $Enums.WidgetSenderType | null
    text: string | null
    createdAt: Date | null
  }

  export type ChatWidgetMessageMaxAggregateOutputType = {
    id: number | null
    sessionId: number | null
    senderType: $Enums.WidgetSenderType | null
    text: string | null
    createdAt: Date | null
  }

  export type ChatWidgetMessageCountAggregateOutputType = {
    id: number
    sessionId: number
    senderType: number
    text: number
    createdAt: number
    _all: number
  }


  export type ChatWidgetMessageAvgAggregateInputType = {
    id?: true
    sessionId?: true
  }

  export type ChatWidgetMessageSumAggregateInputType = {
    id?: true
    sessionId?: true
  }

  export type ChatWidgetMessageMinAggregateInputType = {
    id?: true
    sessionId?: true
    senderType?: true
    text?: true
    createdAt?: true
  }

  export type ChatWidgetMessageMaxAggregateInputType = {
    id?: true
    sessionId?: true
    senderType?: true
    text?: true
    createdAt?: true
  }

  export type ChatWidgetMessageCountAggregateInputType = {
    id?: true
    sessionId?: true
    senderType?: true
    text?: true
    createdAt?: true
    _all?: true
  }

  export type ChatWidgetMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatWidgetMessage to aggregate.
     */
    where?: ChatWidgetMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetMessages to fetch.
     */
    orderBy?: ChatWidgetMessageOrderByWithRelationInput | ChatWidgetMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatWidgetMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatWidgetMessages
    **/
    _count?: true | ChatWidgetMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatWidgetMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatWidgetMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatWidgetMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatWidgetMessageMaxAggregateInputType
  }

  export type GetChatWidgetMessageAggregateType<T extends ChatWidgetMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatWidgetMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatWidgetMessage[P]>
      : GetScalarType<T[P], AggregateChatWidgetMessage[P]>
  }




  export type ChatWidgetMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatWidgetMessageWhereInput
    orderBy?: ChatWidgetMessageOrderByWithAggregationInput | ChatWidgetMessageOrderByWithAggregationInput[]
    by: ChatWidgetMessageScalarFieldEnum[] | ChatWidgetMessageScalarFieldEnum
    having?: ChatWidgetMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatWidgetMessageCountAggregateInputType | true
    _avg?: ChatWidgetMessageAvgAggregateInputType
    _sum?: ChatWidgetMessageSumAggregateInputType
    _min?: ChatWidgetMessageMinAggregateInputType
    _max?: ChatWidgetMessageMaxAggregateInputType
  }

  export type ChatWidgetMessageGroupByOutputType = {
    id: number
    sessionId: number
    senderType: $Enums.WidgetSenderType
    text: string
    createdAt: Date
    _count: ChatWidgetMessageCountAggregateOutputType | null
    _avg: ChatWidgetMessageAvgAggregateOutputType | null
    _sum: ChatWidgetMessageSumAggregateOutputType | null
    _min: ChatWidgetMessageMinAggregateOutputType | null
    _max: ChatWidgetMessageMaxAggregateOutputType | null
  }

  type GetChatWidgetMessageGroupByPayload<T extends ChatWidgetMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatWidgetMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatWidgetMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatWidgetMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ChatWidgetMessageGroupByOutputType[P]>
        }
      >
    >


  export type ChatWidgetMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    senderType?: boolean
    text?: boolean
    createdAt?: boolean
    session?: boolean | ChatWidgetSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatWidgetMessage"]>

  export type ChatWidgetMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    senderType?: boolean
    text?: boolean
    createdAt?: boolean
    session?: boolean | ChatWidgetSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatWidgetMessage"]>

  export type ChatWidgetMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    senderType?: boolean
    text?: boolean
    createdAt?: boolean
    session?: boolean | ChatWidgetSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatWidgetMessage"]>

  export type ChatWidgetMessageSelectScalar = {
    id?: boolean
    sessionId?: boolean
    senderType?: boolean
    text?: boolean
    createdAt?: boolean
  }

  export type ChatWidgetMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "senderType" | "text" | "createdAt", ExtArgs["result"]["chatWidgetMessage"]>
  export type ChatWidgetMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ChatWidgetSessionDefaultArgs<ExtArgs>
  }
  export type ChatWidgetMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ChatWidgetSessionDefaultArgs<ExtArgs>
  }
  export type ChatWidgetMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ChatWidgetSessionDefaultArgs<ExtArgs>
  }

  export type $ChatWidgetMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatWidgetMessage"
    objects: {
      session: Prisma.$ChatWidgetSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sessionId: number
      senderType: $Enums.WidgetSenderType
      text: string
      createdAt: Date
    }, ExtArgs["result"]["chatWidgetMessage"]>
    composites: {}
  }

  type ChatWidgetMessageGetPayload<S extends boolean | null | undefined | ChatWidgetMessageDefaultArgs> = $Result.GetResult<Prisma.$ChatWidgetMessagePayload, S>

  type ChatWidgetMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatWidgetMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatWidgetMessageCountAggregateInputType | true
    }

  export interface ChatWidgetMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatWidgetMessage'], meta: { name: 'ChatWidgetMessage' } }
    /**
     * Find zero or one ChatWidgetMessage that matches the filter.
     * @param {ChatWidgetMessageFindUniqueArgs} args - Arguments to find a ChatWidgetMessage
     * @example
     * // Get one ChatWidgetMessage
     * const chatWidgetMessage = await prisma.chatWidgetMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatWidgetMessageFindUniqueArgs>(args: SelectSubset<T, ChatWidgetMessageFindUniqueArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ChatWidgetMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatWidgetMessageFindUniqueOrThrowArgs} args - Arguments to find a ChatWidgetMessage
     * @example
     * // Get one ChatWidgetMessage
     * const chatWidgetMessage = await prisma.chatWidgetMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatWidgetMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatWidgetMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ChatWidgetMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetMessageFindFirstArgs} args - Arguments to find a ChatWidgetMessage
     * @example
     * // Get one ChatWidgetMessage
     * const chatWidgetMessage = await prisma.chatWidgetMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatWidgetMessageFindFirstArgs>(args?: SelectSubset<T, ChatWidgetMessageFindFirstArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ChatWidgetMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetMessageFindFirstOrThrowArgs} args - Arguments to find a ChatWidgetMessage
     * @example
     * // Get one ChatWidgetMessage
     * const chatWidgetMessage = await prisma.chatWidgetMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatWidgetMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatWidgetMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ChatWidgetMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatWidgetMessages
     * const chatWidgetMessages = await prisma.chatWidgetMessage.findMany()
     * 
     * // Get first 10 ChatWidgetMessages
     * const chatWidgetMessages = await prisma.chatWidgetMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWidgetMessageWithIdOnly = await prisma.chatWidgetMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatWidgetMessageFindManyArgs>(args?: SelectSubset<T, ChatWidgetMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ChatWidgetMessage.
     * @param {ChatWidgetMessageCreateArgs} args - Arguments to create a ChatWidgetMessage.
     * @example
     * // Create one ChatWidgetMessage
     * const ChatWidgetMessage = await prisma.chatWidgetMessage.create({
     *   data: {
     *     // ... data to create a ChatWidgetMessage
     *   }
     * })
     * 
     */
    create<T extends ChatWidgetMessageCreateArgs>(args: SelectSubset<T, ChatWidgetMessageCreateArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ChatWidgetMessages.
     * @param {ChatWidgetMessageCreateManyArgs} args - Arguments to create many ChatWidgetMessages.
     * @example
     * // Create many ChatWidgetMessages
     * const chatWidgetMessage = await prisma.chatWidgetMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatWidgetMessageCreateManyArgs>(args?: SelectSubset<T, ChatWidgetMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatWidgetMessages and returns the data saved in the database.
     * @param {ChatWidgetMessageCreateManyAndReturnArgs} args - Arguments to create many ChatWidgetMessages.
     * @example
     * // Create many ChatWidgetMessages
     * const chatWidgetMessage = await prisma.chatWidgetMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatWidgetMessages and only return the `id`
     * const chatWidgetMessageWithIdOnly = await prisma.chatWidgetMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatWidgetMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatWidgetMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ChatWidgetMessage.
     * @param {ChatWidgetMessageDeleteArgs} args - Arguments to delete one ChatWidgetMessage.
     * @example
     * // Delete one ChatWidgetMessage
     * const ChatWidgetMessage = await prisma.chatWidgetMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatWidgetMessage
     *   }
     * })
     * 
     */
    delete<T extends ChatWidgetMessageDeleteArgs>(args: SelectSubset<T, ChatWidgetMessageDeleteArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ChatWidgetMessage.
     * @param {ChatWidgetMessageUpdateArgs} args - Arguments to update one ChatWidgetMessage.
     * @example
     * // Update one ChatWidgetMessage
     * const chatWidgetMessage = await prisma.chatWidgetMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatWidgetMessageUpdateArgs>(args: SelectSubset<T, ChatWidgetMessageUpdateArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ChatWidgetMessages.
     * @param {ChatWidgetMessageDeleteManyArgs} args - Arguments to filter ChatWidgetMessages to delete.
     * @example
     * // Delete a few ChatWidgetMessages
     * const { count } = await prisma.chatWidgetMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatWidgetMessageDeleteManyArgs>(args?: SelectSubset<T, ChatWidgetMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatWidgetMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatWidgetMessages
     * const chatWidgetMessage = await prisma.chatWidgetMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatWidgetMessageUpdateManyArgs>(args: SelectSubset<T, ChatWidgetMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatWidgetMessages and returns the data updated in the database.
     * @param {ChatWidgetMessageUpdateManyAndReturnArgs} args - Arguments to update many ChatWidgetMessages.
     * @example
     * // Update many ChatWidgetMessages
     * const chatWidgetMessage = await prisma.chatWidgetMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatWidgetMessages and only return the `id`
     * const chatWidgetMessageWithIdOnly = await prisma.chatWidgetMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatWidgetMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatWidgetMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ChatWidgetMessage.
     * @param {ChatWidgetMessageUpsertArgs} args - Arguments to update or create a ChatWidgetMessage.
     * @example
     * // Update or create a ChatWidgetMessage
     * const chatWidgetMessage = await prisma.chatWidgetMessage.upsert({
     *   create: {
     *     // ... data to create a ChatWidgetMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatWidgetMessage we want to update
     *   }
     * })
     */
    upsert<T extends ChatWidgetMessageUpsertArgs>(args: SelectSubset<T, ChatWidgetMessageUpsertArgs<ExtArgs>>): Prisma__ChatWidgetMessageClient<$Result.GetResult<Prisma.$ChatWidgetMessagePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ChatWidgetMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetMessageCountArgs} args - Arguments to filter ChatWidgetMessages to count.
     * @example
     * // Count the number of ChatWidgetMessages
     * const count = await prisma.chatWidgetMessage.count({
     *   where: {
     *     // ... the filter for the ChatWidgetMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatWidgetMessageCountArgs>(
      args?: Subset<T, ChatWidgetMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatWidgetMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatWidgetMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatWidgetMessageAggregateArgs>(args: Subset<T, ChatWidgetMessageAggregateArgs>): Prisma.PrismaPromise<GetChatWidgetMessageAggregateType<T>>

    /**
     * Group by ChatWidgetMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatWidgetMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatWidgetMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatWidgetMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatWidgetMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatWidgetMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatWidgetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatWidgetMessage model
   */
  readonly fields: ChatWidgetMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatWidgetMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatWidgetMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends ChatWidgetSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatWidgetSessionDefaultArgs<ExtArgs>>): Prisma__ChatWidgetSessionClient<$Result.GetResult<Prisma.$ChatWidgetSessionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatWidgetMessage model
   */ 
  interface ChatWidgetMessageFieldRefs {
    readonly id: FieldRef<"ChatWidgetMessage", 'Int'>
    readonly sessionId: FieldRef<"ChatWidgetMessage", 'Int'>
    readonly senderType: FieldRef<"ChatWidgetMessage", 'WidgetSenderType'>
    readonly text: FieldRef<"ChatWidgetMessage", 'String'>
    readonly createdAt: FieldRef<"ChatWidgetMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatWidgetMessage findUnique
   */
  export type ChatWidgetMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetMessage to fetch.
     */
    where: ChatWidgetMessageWhereUniqueInput
  }

  /**
   * ChatWidgetMessage findUniqueOrThrow
   */
  export type ChatWidgetMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetMessage to fetch.
     */
    where: ChatWidgetMessageWhereUniqueInput
  }

  /**
   * ChatWidgetMessage findFirst
   */
  export type ChatWidgetMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetMessage to fetch.
     */
    where?: ChatWidgetMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetMessages to fetch.
     */
    orderBy?: ChatWidgetMessageOrderByWithRelationInput | ChatWidgetMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatWidgetMessages.
     */
    cursor?: ChatWidgetMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatWidgetMessages.
     */
    distinct?: ChatWidgetMessageScalarFieldEnum | ChatWidgetMessageScalarFieldEnum[]
  }

  /**
   * ChatWidgetMessage findFirstOrThrow
   */
  export type ChatWidgetMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetMessage to fetch.
     */
    where?: ChatWidgetMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetMessages to fetch.
     */
    orderBy?: ChatWidgetMessageOrderByWithRelationInput | ChatWidgetMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatWidgetMessages.
     */
    cursor?: ChatWidgetMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatWidgetMessages.
     */
    distinct?: ChatWidgetMessageScalarFieldEnum | ChatWidgetMessageScalarFieldEnum[]
  }

  /**
   * ChatWidgetMessage findMany
   */
  export type ChatWidgetMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatWidgetMessages to fetch.
     */
    where?: ChatWidgetMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatWidgetMessages to fetch.
     */
    orderBy?: ChatWidgetMessageOrderByWithRelationInput | ChatWidgetMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatWidgetMessages.
     */
    cursor?: ChatWidgetMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatWidgetMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatWidgetMessages.
     */
    skip?: number
    distinct?: ChatWidgetMessageScalarFieldEnum | ChatWidgetMessageScalarFieldEnum[]
  }

  /**
   * ChatWidgetMessage create
   */
  export type ChatWidgetMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatWidgetMessage.
     */
    data: XOR<ChatWidgetMessageCreateInput, ChatWidgetMessageUncheckedCreateInput>
  }

  /**
   * ChatWidgetMessage createMany
   */
  export type ChatWidgetMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatWidgetMessages.
     */
    data: ChatWidgetMessageCreateManyInput | ChatWidgetMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatWidgetMessage createManyAndReturn
   */
  export type ChatWidgetMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ChatWidgetMessages.
     */
    data: ChatWidgetMessageCreateManyInput | ChatWidgetMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatWidgetMessage update
   */
  export type ChatWidgetMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatWidgetMessage.
     */
    data: XOR<ChatWidgetMessageUpdateInput, ChatWidgetMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatWidgetMessage to update.
     */
    where: ChatWidgetMessageWhereUniqueInput
  }

  /**
   * ChatWidgetMessage updateMany
   */
  export type ChatWidgetMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatWidgetMessages.
     */
    data: XOR<ChatWidgetMessageUpdateManyMutationInput, ChatWidgetMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatWidgetMessages to update
     */
    where?: ChatWidgetMessageWhereInput
  }

  /**
   * ChatWidgetMessage updateManyAndReturn
   */
  export type ChatWidgetMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * The data used to update ChatWidgetMessages.
     */
    data: XOR<ChatWidgetMessageUpdateManyMutationInput, ChatWidgetMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatWidgetMessages to update
     */
    where?: ChatWidgetMessageWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatWidgetMessage upsert
   */
  export type ChatWidgetMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatWidgetMessage to update in case it exists.
     */
    where: ChatWidgetMessageWhereUniqueInput
    /**
     * In case the ChatWidgetMessage found by the `where` argument doesn't exist, create a new ChatWidgetMessage with this data.
     */
    create: XOR<ChatWidgetMessageCreateInput, ChatWidgetMessageUncheckedCreateInput>
    /**
     * In case the ChatWidgetMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatWidgetMessageUpdateInput, ChatWidgetMessageUncheckedUpdateInput>
  }

  /**
   * ChatWidgetMessage delete
   */
  export type ChatWidgetMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
    /**
     * Filter which ChatWidgetMessage to delete.
     */
    where: ChatWidgetMessageWhereUniqueInput
  }

  /**
   * ChatWidgetMessage deleteMany
   */
  export type ChatWidgetMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatWidgetMessages to delete
     */
    where?: ChatWidgetMessageWhereInput
  }

  /**
   * ChatWidgetMessage without action
   */
  export type ChatWidgetMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatWidgetMessage
     */
    select?: ChatWidgetMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatWidgetMessage
     */
    omit?: ChatWidgetMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatWidgetMessageInclude<ExtArgs> | null
  }


  /**
   * Model VoiceSessionLog
   */

  export type AggregateVoiceSessionLog = {
    _count: VoiceSessionLogCountAggregateOutputType | null
    _avg: VoiceSessionLogAvgAggregateOutputType | null
    _sum: VoiceSessionLogSumAggregateOutputType | null
    _min: VoiceSessionLogMinAggregateOutputType | null
    _max: VoiceSessionLogMaxAggregateOutputType | null
  }

  export type VoiceSessionLogAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
    duration: number | null
  }

  export type VoiceSessionLogSumAggregateOutputType = {
    id: number | null
    customerId: number | null
    duration: number | null
  }

  export type VoiceSessionLogMinAggregateOutputType = {
    id: number | null
    conversationId: string | null
    customerId: number | null
    transcript: string | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type VoiceSessionLogMaxAggregateOutputType = {
    id: number | null
    conversationId: string | null
    customerId: number | null
    transcript: string | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type VoiceSessionLogCountAggregateOutputType = {
    id: number
    conversationId: number
    customerId: number
    transcript: number
    audioUrl: number
    duration: number
    createdAt: number
    _all: number
  }


  export type VoiceSessionLogAvgAggregateInputType = {
    id?: true
    customerId?: true
    duration?: true
  }

  export type VoiceSessionLogSumAggregateInputType = {
    id?: true
    customerId?: true
    duration?: true
  }

  export type VoiceSessionLogMinAggregateInputType = {
    id?: true
    conversationId?: true
    customerId?: true
    transcript?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
  }

  export type VoiceSessionLogMaxAggregateInputType = {
    id?: true
    conversationId?: true
    customerId?: true
    transcript?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
  }

  export type VoiceSessionLogCountAggregateInputType = {
    id?: true
    conversationId?: true
    customerId?: true
    transcript?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
    _all?: true
  }

  export type VoiceSessionLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoiceSessionLog to aggregate.
     */
    where?: VoiceSessionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceSessionLogs to fetch.
     */
    orderBy?: VoiceSessionLogOrderByWithRelationInput | VoiceSessionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoiceSessionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceSessionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceSessionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VoiceSessionLogs
    **/
    _count?: true | VoiceSessionLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoiceSessionLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoiceSessionLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoiceSessionLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoiceSessionLogMaxAggregateInputType
  }

  export type GetVoiceSessionLogAggregateType<T extends VoiceSessionLogAggregateArgs> = {
        [P in keyof T & keyof AggregateVoiceSessionLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoiceSessionLog[P]>
      : GetScalarType<T[P], AggregateVoiceSessionLog[P]>
  }




  export type VoiceSessionLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoiceSessionLogWhereInput
    orderBy?: VoiceSessionLogOrderByWithAggregationInput | VoiceSessionLogOrderByWithAggregationInput[]
    by: VoiceSessionLogScalarFieldEnum[] | VoiceSessionLogScalarFieldEnum
    having?: VoiceSessionLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoiceSessionLogCountAggregateInputType | true
    _avg?: VoiceSessionLogAvgAggregateInputType
    _sum?: VoiceSessionLogSumAggregateInputType
    _min?: VoiceSessionLogMinAggregateInputType
    _max?: VoiceSessionLogMaxAggregateInputType
  }

  export type VoiceSessionLogGroupByOutputType = {
    id: number
    conversationId: string
    customerId: number | null
    transcript: string | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date
    _count: VoiceSessionLogCountAggregateOutputType | null
    _avg: VoiceSessionLogAvgAggregateOutputType | null
    _sum: VoiceSessionLogSumAggregateOutputType | null
    _min: VoiceSessionLogMinAggregateOutputType | null
    _max: VoiceSessionLogMaxAggregateOutputType | null
  }

  type GetVoiceSessionLogGroupByPayload<T extends VoiceSessionLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoiceSessionLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoiceSessionLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoiceSessionLogGroupByOutputType[P]>
            : GetScalarType<T[P], VoiceSessionLogGroupByOutputType[P]>
        }
      >
    >


  export type VoiceSessionLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    customerId?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    customer?: boolean | VoiceSessionLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["voiceSessionLog"]>

  export type VoiceSessionLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    customerId?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    customer?: boolean | VoiceSessionLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["voiceSessionLog"]>

  export type VoiceSessionLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    customerId?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    customer?: boolean | VoiceSessionLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["voiceSessionLog"]>

  export type VoiceSessionLogSelectScalar = {
    id?: boolean
    conversationId?: boolean
    customerId?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
  }

  export type VoiceSessionLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "customerId" | "transcript" | "audioUrl" | "duration" | "createdAt", ExtArgs["result"]["voiceSessionLog"]>
  export type VoiceSessionLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | VoiceSessionLog$customerArgs<ExtArgs>
  }
  export type VoiceSessionLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | VoiceSessionLog$customerArgs<ExtArgs>
  }
  export type VoiceSessionLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | VoiceSessionLog$customerArgs<ExtArgs>
  }

  export type $VoiceSessionLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VoiceSessionLog"
    objects: {
      customer: Prisma.$PortalUserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      conversationId: string
      customerId: number | null
      transcript: string | null
      audioUrl: string | null
      duration: number | null
      createdAt: Date
    }, ExtArgs["result"]["voiceSessionLog"]>
    composites: {}
  }

  type VoiceSessionLogGetPayload<S extends boolean | null | undefined | VoiceSessionLogDefaultArgs> = $Result.GetResult<Prisma.$VoiceSessionLogPayload, S>

  type VoiceSessionLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoiceSessionLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoiceSessionLogCountAggregateInputType | true
    }

  export interface VoiceSessionLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VoiceSessionLog'], meta: { name: 'VoiceSessionLog' } }
    /**
     * Find zero or one VoiceSessionLog that matches the filter.
     * @param {VoiceSessionLogFindUniqueArgs} args - Arguments to find a VoiceSessionLog
     * @example
     * // Get one VoiceSessionLog
     * const voiceSessionLog = await prisma.voiceSessionLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoiceSessionLogFindUniqueArgs>(args: SelectSubset<T, VoiceSessionLogFindUniqueArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one VoiceSessionLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoiceSessionLogFindUniqueOrThrowArgs} args - Arguments to find a VoiceSessionLog
     * @example
     * // Get one VoiceSessionLog
     * const voiceSessionLog = await prisma.voiceSessionLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoiceSessionLogFindUniqueOrThrowArgs>(args: SelectSubset<T, VoiceSessionLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first VoiceSessionLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceSessionLogFindFirstArgs} args - Arguments to find a VoiceSessionLog
     * @example
     * // Get one VoiceSessionLog
     * const voiceSessionLog = await prisma.voiceSessionLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoiceSessionLogFindFirstArgs>(args?: SelectSubset<T, VoiceSessionLogFindFirstArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first VoiceSessionLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceSessionLogFindFirstOrThrowArgs} args - Arguments to find a VoiceSessionLog
     * @example
     * // Get one VoiceSessionLog
     * const voiceSessionLog = await prisma.voiceSessionLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoiceSessionLogFindFirstOrThrowArgs>(args?: SelectSubset<T, VoiceSessionLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more VoiceSessionLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceSessionLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VoiceSessionLogs
     * const voiceSessionLogs = await prisma.voiceSessionLog.findMany()
     * 
     * // Get first 10 VoiceSessionLogs
     * const voiceSessionLogs = await prisma.voiceSessionLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voiceSessionLogWithIdOnly = await prisma.voiceSessionLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoiceSessionLogFindManyArgs>(args?: SelectSubset<T, VoiceSessionLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a VoiceSessionLog.
     * @param {VoiceSessionLogCreateArgs} args - Arguments to create a VoiceSessionLog.
     * @example
     * // Create one VoiceSessionLog
     * const VoiceSessionLog = await prisma.voiceSessionLog.create({
     *   data: {
     *     // ... data to create a VoiceSessionLog
     *   }
     * })
     * 
     */
    create<T extends VoiceSessionLogCreateArgs>(args: SelectSubset<T, VoiceSessionLogCreateArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many VoiceSessionLogs.
     * @param {VoiceSessionLogCreateManyArgs} args - Arguments to create many VoiceSessionLogs.
     * @example
     * // Create many VoiceSessionLogs
     * const voiceSessionLog = await prisma.voiceSessionLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoiceSessionLogCreateManyArgs>(args?: SelectSubset<T, VoiceSessionLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VoiceSessionLogs and returns the data saved in the database.
     * @param {VoiceSessionLogCreateManyAndReturnArgs} args - Arguments to create many VoiceSessionLogs.
     * @example
     * // Create many VoiceSessionLogs
     * const voiceSessionLog = await prisma.voiceSessionLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VoiceSessionLogs and only return the `id`
     * const voiceSessionLogWithIdOnly = await prisma.voiceSessionLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoiceSessionLogCreateManyAndReturnArgs>(args?: SelectSubset<T, VoiceSessionLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a VoiceSessionLog.
     * @param {VoiceSessionLogDeleteArgs} args - Arguments to delete one VoiceSessionLog.
     * @example
     * // Delete one VoiceSessionLog
     * const VoiceSessionLog = await prisma.voiceSessionLog.delete({
     *   where: {
     *     // ... filter to delete one VoiceSessionLog
     *   }
     * })
     * 
     */
    delete<T extends VoiceSessionLogDeleteArgs>(args: SelectSubset<T, VoiceSessionLogDeleteArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one VoiceSessionLog.
     * @param {VoiceSessionLogUpdateArgs} args - Arguments to update one VoiceSessionLog.
     * @example
     * // Update one VoiceSessionLog
     * const voiceSessionLog = await prisma.voiceSessionLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoiceSessionLogUpdateArgs>(args: SelectSubset<T, VoiceSessionLogUpdateArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more VoiceSessionLogs.
     * @param {VoiceSessionLogDeleteManyArgs} args - Arguments to filter VoiceSessionLogs to delete.
     * @example
     * // Delete a few VoiceSessionLogs
     * const { count } = await prisma.voiceSessionLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoiceSessionLogDeleteManyArgs>(args?: SelectSubset<T, VoiceSessionLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoiceSessionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceSessionLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VoiceSessionLogs
     * const voiceSessionLog = await prisma.voiceSessionLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoiceSessionLogUpdateManyArgs>(args: SelectSubset<T, VoiceSessionLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoiceSessionLogs and returns the data updated in the database.
     * @param {VoiceSessionLogUpdateManyAndReturnArgs} args - Arguments to update many VoiceSessionLogs.
     * @example
     * // Update many VoiceSessionLogs
     * const voiceSessionLog = await prisma.voiceSessionLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VoiceSessionLogs and only return the `id`
     * const voiceSessionLogWithIdOnly = await prisma.voiceSessionLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoiceSessionLogUpdateManyAndReturnArgs>(args: SelectSubset<T, VoiceSessionLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one VoiceSessionLog.
     * @param {VoiceSessionLogUpsertArgs} args - Arguments to update or create a VoiceSessionLog.
     * @example
     * // Update or create a VoiceSessionLog
     * const voiceSessionLog = await prisma.voiceSessionLog.upsert({
     *   create: {
     *     // ... data to create a VoiceSessionLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VoiceSessionLog we want to update
     *   }
     * })
     */
    upsert<T extends VoiceSessionLogUpsertArgs>(args: SelectSubset<T, VoiceSessionLogUpsertArgs<ExtArgs>>): Prisma__VoiceSessionLogClient<$Result.GetResult<Prisma.$VoiceSessionLogPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of VoiceSessionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceSessionLogCountArgs} args - Arguments to filter VoiceSessionLogs to count.
     * @example
     * // Count the number of VoiceSessionLogs
     * const count = await prisma.voiceSessionLog.count({
     *   where: {
     *     // ... the filter for the VoiceSessionLogs we want to count
     *   }
     * })
    **/
    count<T extends VoiceSessionLogCountArgs>(
      args?: Subset<T, VoiceSessionLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoiceSessionLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VoiceSessionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceSessionLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoiceSessionLogAggregateArgs>(args: Subset<T, VoiceSessionLogAggregateArgs>): Prisma.PrismaPromise<GetVoiceSessionLogAggregateType<T>>

    /**
     * Group by VoiceSessionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceSessionLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoiceSessionLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoiceSessionLogGroupByArgs['orderBy'] }
        : { orderBy?: VoiceSessionLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoiceSessionLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoiceSessionLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VoiceSessionLog model
   */
  readonly fields: VoiceSessionLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VoiceSessionLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoiceSessionLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends VoiceSessionLog$customerArgs<ExtArgs> = {}>(args?: Subset<T, VoiceSessionLog$customerArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VoiceSessionLog model
   */ 
  interface VoiceSessionLogFieldRefs {
    readonly id: FieldRef<"VoiceSessionLog", 'Int'>
    readonly conversationId: FieldRef<"VoiceSessionLog", 'String'>
    readonly customerId: FieldRef<"VoiceSessionLog", 'Int'>
    readonly transcript: FieldRef<"VoiceSessionLog", 'String'>
    readonly audioUrl: FieldRef<"VoiceSessionLog", 'String'>
    readonly duration: FieldRef<"VoiceSessionLog", 'Int'>
    readonly createdAt: FieldRef<"VoiceSessionLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VoiceSessionLog findUnique
   */
  export type VoiceSessionLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * Filter, which VoiceSessionLog to fetch.
     */
    where: VoiceSessionLogWhereUniqueInput
  }

  /**
   * VoiceSessionLog findUniqueOrThrow
   */
  export type VoiceSessionLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * Filter, which VoiceSessionLog to fetch.
     */
    where: VoiceSessionLogWhereUniqueInput
  }

  /**
   * VoiceSessionLog findFirst
   */
  export type VoiceSessionLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * Filter, which VoiceSessionLog to fetch.
     */
    where?: VoiceSessionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceSessionLogs to fetch.
     */
    orderBy?: VoiceSessionLogOrderByWithRelationInput | VoiceSessionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoiceSessionLogs.
     */
    cursor?: VoiceSessionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceSessionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceSessionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoiceSessionLogs.
     */
    distinct?: VoiceSessionLogScalarFieldEnum | VoiceSessionLogScalarFieldEnum[]
  }

  /**
   * VoiceSessionLog findFirstOrThrow
   */
  export type VoiceSessionLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * Filter, which VoiceSessionLog to fetch.
     */
    where?: VoiceSessionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceSessionLogs to fetch.
     */
    orderBy?: VoiceSessionLogOrderByWithRelationInput | VoiceSessionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoiceSessionLogs.
     */
    cursor?: VoiceSessionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceSessionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceSessionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoiceSessionLogs.
     */
    distinct?: VoiceSessionLogScalarFieldEnum | VoiceSessionLogScalarFieldEnum[]
  }

  /**
   * VoiceSessionLog findMany
   */
  export type VoiceSessionLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * Filter, which VoiceSessionLogs to fetch.
     */
    where?: VoiceSessionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceSessionLogs to fetch.
     */
    orderBy?: VoiceSessionLogOrderByWithRelationInput | VoiceSessionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VoiceSessionLogs.
     */
    cursor?: VoiceSessionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceSessionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceSessionLogs.
     */
    skip?: number
    distinct?: VoiceSessionLogScalarFieldEnum | VoiceSessionLogScalarFieldEnum[]
  }

  /**
   * VoiceSessionLog create
   */
  export type VoiceSessionLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * The data needed to create a VoiceSessionLog.
     */
    data: XOR<VoiceSessionLogCreateInput, VoiceSessionLogUncheckedCreateInput>
  }

  /**
   * VoiceSessionLog createMany
   */
  export type VoiceSessionLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VoiceSessionLogs.
     */
    data: VoiceSessionLogCreateManyInput | VoiceSessionLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VoiceSessionLog createManyAndReturn
   */
  export type VoiceSessionLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * The data used to create many VoiceSessionLogs.
     */
    data: VoiceSessionLogCreateManyInput | VoiceSessionLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoiceSessionLog update
   */
  export type VoiceSessionLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * The data needed to update a VoiceSessionLog.
     */
    data: XOR<VoiceSessionLogUpdateInput, VoiceSessionLogUncheckedUpdateInput>
    /**
     * Choose, which VoiceSessionLog to update.
     */
    where: VoiceSessionLogWhereUniqueInput
  }

  /**
   * VoiceSessionLog updateMany
   */
  export type VoiceSessionLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VoiceSessionLogs.
     */
    data: XOR<VoiceSessionLogUpdateManyMutationInput, VoiceSessionLogUncheckedUpdateManyInput>
    /**
     * Filter which VoiceSessionLogs to update
     */
    where?: VoiceSessionLogWhereInput
  }

  /**
   * VoiceSessionLog updateManyAndReturn
   */
  export type VoiceSessionLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * The data used to update VoiceSessionLogs.
     */
    data: XOR<VoiceSessionLogUpdateManyMutationInput, VoiceSessionLogUncheckedUpdateManyInput>
    /**
     * Filter which VoiceSessionLogs to update
     */
    where?: VoiceSessionLogWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoiceSessionLog upsert
   */
  export type VoiceSessionLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * The filter to search for the VoiceSessionLog to update in case it exists.
     */
    where: VoiceSessionLogWhereUniqueInput
    /**
     * In case the VoiceSessionLog found by the `where` argument doesn't exist, create a new VoiceSessionLog with this data.
     */
    create: XOR<VoiceSessionLogCreateInput, VoiceSessionLogUncheckedCreateInput>
    /**
     * In case the VoiceSessionLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoiceSessionLogUpdateInput, VoiceSessionLogUncheckedUpdateInput>
  }

  /**
   * VoiceSessionLog delete
   */
  export type VoiceSessionLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
    /**
     * Filter which VoiceSessionLog to delete.
     */
    where: VoiceSessionLogWhereUniqueInput
  }

  /**
   * VoiceSessionLog deleteMany
   */
  export type VoiceSessionLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoiceSessionLogs to delete
     */
    where?: VoiceSessionLogWhereInput
  }

  /**
   * VoiceSessionLog.customer
   */
  export type VoiceSessionLog$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    where?: PortalUserWhereInput
  }

  /**
   * VoiceSessionLog without action
   */
  export type VoiceSessionLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceSessionLog
     */
    select?: VoiceSessionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoiceSessionLog
     */
    omit?: VoiceSessionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoiceSessionLogInclude<ExtArgs> | null
  }


  /**
   * Model CallLog
   */

  export type AggregateCallLog = {
    _count: CallLogCountAggregateOutputType | null
    _avg: CallLogAvgAggregateOutputType | null
    _sum: CallLogSumAggregateOutputType | null
    _min: CallLogMinAggregateOutputType | null
    _max: CallLogMaxAggregateOutputType | null
  }

  export type CallLogAvgAggregateOutputType = {
    id: number | null
    duration: number | null
    customerId: number | null
  }

  export type CallLogSumAggregateOutputType = {
    id: number | null
    duration: number | null
    customerId: number | null
  }

  export type CallLogMinAggregateOutputType = {
    id: number | null
    callerNumber: string | null
    transcript: string | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date | null
    customerId: number | null
  }

  export type CallLogMaxAggregateOutputType = {
    id: number | null
    callerNumber: string | null
    transcript: string | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date | null
    customerId: number | null
  }

  export type CallLogCountAggregateOutputType = {
    id: number
    callerNumber: number
    transcript: number
    audioUrl: number
    duration: number
    createdAt: number
    customerId: number
    _all: number
  }


  export type CallLogAvgAggregateInputType = {
    id?: true
    duration?: true
    customerId?: true
  }

  export type CallLogSumAggregateInputType = {
    id?: true
    duration?: true
    customerId?: true
  }

  export type CallLogMinAggregateInputType = {
    id?: true
    callerNumber?: true
    transcript?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
    customerId?: true
  }

  export type CallLogMaxAggregateInputType = {
    id?: true
    callerNumber?: true
    transcript?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
    customerId?: true
  }

  export type CallLogCountAggregateInputType = {
    id?: true
    callerNumber?: true
    transcript?: true
    audioUrl?: true
    duration?: true
    createdAt?: true
    customerId?: true
    _all?: true
  }

  export type CallLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallLog to aggregate.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallLogs
    **/
    _count?: true | CallLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallLogMaxAggregateInputType
  }

  export type GetCallLogAggregateType<T extends CallLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCallLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallLog[P]>
      : GetScalarType<T[P], AggregateCallLog[P]>
  }




  export type CallLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallLogWhereInput
    orderBy?: CallLogOrderByWithAggregationInput | CallLogOrderByWithAggregationInput[]
    by: CallLogScalarFieldEnum[] | CallLogScalarFieldEnum
    having?: CallLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallLogCountAggregateInputType | true
    _avg?: CallLogAvgAggregateInputType
    _sum?: CallLogSumAggregateInputType
    _min?: CallLogMinAggregateInputType
    _max?: CallLogMaxAggregateInputType
  }

  export type CallLogGroupByOutputType = {
    id: number
    callerNumber: string
    transcript: string | null
    audioUrl: string | null
    duration: number | null
    createdAt: Date
    customerId: number | null
    _count: CallLogCountAggregateOutputType | null
    _avg: CallLogAvgAggregateOutputType | null
    _sum: CallLogSumAggregateOutputType | null
    _min: CallLogMinAggregateOutputType | null
    _max: CallLogMaxAggregateOutputType | null
  }

  type GetCallLogGroupByPayload<T extends CallLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallLogGroupByOutputType[P]>
            : GetScalarType<T[P], CallLogGroupByOutputType[P]>
        }
      >
    >


  export type CallLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callerNumber?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    customerId?: boolean
    customer?: boolean | CallLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["callLog"]>

  export type CallLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callerNumber?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    customerId?: boolean
    customer?: boolean | CallLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["callLog"]>

  export type CallLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callerNumber?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    customerId?: boolean
    customer?: boolean | CallLog$customerArgs<ExtArgs>
  }, ExtArgs["result"]["callLog"]>

  export type CallLogSelectScalar = {
    id?: boolean
    callerNumber?: boolean
    transcript?: boolean
    audioUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    customerId?: boolean
  }

  export type CallLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "callerNumber" | "transcript" | "audioUrl" | "duration" | "createdAt" | "customerId", ExtArgs["result"]["callLog"]>
  export type CallLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CallLog$customerArgs<ExtArgs>
  }
  export type CallLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CallLog$customerArgs<ExtArgs>
  }
  export type CallLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CallLog$customerArgs<ExtArgs>
  }

  export type $CallLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallLog"
    objects: {
      customer: Prisma.$PortalUserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      callerNumber: string
      transcript: string | null
      audioUrl: string | null
      duration: number | null
      createdAt: Date
      customerId: number | null
    }, ExtArgs["result"]["callLog"]>
    composites: {}
  }

  type CallLogGetPayload<S extends boolean | null | undefined | CallLogDefaultArgs> = $Result.GetResult<Prisma.$CallLogPayload, S>

  type CallLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallLogCountAggregateInputType | true
    }

  export interface CallLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallLog'], meta: { name: 'CallLog' } }
    /**
     * Find zero or one CallLog that matches the filter.
     * @param {CallLogFindUniqueArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallLogFindUniqueArgs>(args: SelectSubset<T, CallLogFindUniqueArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CallLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallLogFindUniqueOrThrowArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CallLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CallLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindFirstArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallLogFindFirstArgs>(args?: SelectSubset<T, CallLogFindFirstArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CallLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindFirstOrThrowArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CallLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CallLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallLogs
     * const callLogs = await prisma.callLog.findMany()
     * 
     * // Get first 10 CallLogs
     * const callLogs = await prisma.callLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callLogWithIdOnly = await prisma.callLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallLogFindManyArgs>(args?: SelectSubset<T, CallLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CallLog.
     * @param {CallLogCreateArgs} args - Arguments to create a CallLog.
     * @example
     * // Create one CallLog
     * const CallLog = await prisma.callLog.create({
     *   data: {
     *     // ... data to create a CallLog
     *   }
     * })
     * 
     */
    create<T extends CallLogCreateArgs>(args: SelectSubset<T, CallLogCreateArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CallLogs.
     * @param {CallLogCreateManyArgs} args - Arguments to create many CallLogs.
     * @example
     * // Create many CallLogs
     * const callLog = await prisma.callLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallLogCreateManyArgs>(args?: SelectSubset<T, CallLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallLogs and returns the data saved in the database.
     * @param {CallLogCreateManyAndReturnArgs} args - Arguments to create many CallLogs.
     * @example
     * // Create many CallLogs
     * const callLog = await prisma.callLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallLogs and only return the `id`
     * const callLogWithIdOnly = await prisma.callLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CallLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CallLog.
     * @param {CallLogDeleteArgs} args - Arguments to delete one CallLog.
     * @example
     * // Delete one CallLog
     * const CallLog = await prisma.callLog.delete({
     *   where: {
     *     // ... filter to delete one CallLog
     *   }
     * })
     * 
     */
    delete<T extends CallLogDeleteArgs>(args: SelectSubset<T, CallLogDeleteArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CallLog.
     * @param {CallLogUpdateArgs} args - Arguments to update one CallLog.
     * @example
     * // Update one CallLog
     * const callLog = await prisma.callLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallLogUpdateArgs>(args: SelectSubset<T, CallLogUpdateArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CallLogs.
     * @param {CallLogDeleteManyArgs} args - Arguments to filter CallLogs to delete.
     * @example
     * // Delete a few CallLogs
     * const { count } = await prisma.callLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallLogDeleteManyArgs>(args?: SelectSubset<T, CallLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallLogs
     * const callLog = await prisma.callLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallLogUpdateManyArgs>(args: SelectSubset<T, CallLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallLogs and returns the data updated in the database.
     * @param {CallLogUpdateManyAndReturnArgs} args - Arguments to update many CallLogs.
     * @example
     * // Update many CallLogs
     * const callLog = await prisma.callLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CallLogs and only return the `id`
     * const callLogWithIdOnly = await prisma.callLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CallLogUpdateManyAndReturnArgs>(args: SelectSubset<T, CallLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CallLog.
     * @param {CallLogUpsertArgs} args - Arguments to update or create a CallLog.
     * @example
     * // Update or create a CallLog
     * const callLog = await prisma.callLog.upsert({
     *   create: {
     *     // ... data to create a CallLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallLog we want to update
     *   }
     * })
     */
    upsert<T extends CallLogUpsertArgs>(args: SelectSubset<T, CallLogUpsertArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogCountArgs} args - Arguments to filter CallLogs to count.
     * @example
     * // Count the number of CallLogs
     * const count = await prisma.callLog.count({
     *   where: {
     *     // ... the filter for the CallLogs we want to count
     *   }
     * })
    **/
    count<T extends CallLogCountArgs>(
      args?: Subset<T, CallLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallLogAggregateArgs>(args: Subset<T, CallLogAggregateArgs>): Prisma.PrismaPromise<GetCallLogAggregateType<T>>

    /**
     * Group by CallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallLogGroupByArgs['orderBy'] }
        : { orderBy?: CallLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallLog model
   */
  readonly fields: CallLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CallLog$customerArgs<ExtArgs> = {}>(args?: Subset<T, CallLog$customerArgs<ExtArgs>>): Prisma__PortalUserClient<$Result.GetResult<Prisma.$PortalUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallLog model
   */ 
  interface CallLogFieldRefs {
    readonly id: FieldRef<"CallLog", 'Int'>
    readonly callerNumber: FieldRef<"CallLog", 'String'>
    readonly transcript: FieldRef<"CallLog", 'String'>
    readonly audioUrl: FieldRef<"CallLog", 'String'>
    readonly duration: FieldRef<"CallLog", 'Int'>
    readonly createdAt: FieldRef<"CallLog", 'DateTime'>
    readonly customerId: FieldRef<"CallLog", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CallLog findUnique
   */
  export type CallLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog findUniqueOrThrow
   */
  export type CallLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog findFirst
   */
  export type CallLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallLogs.
     */
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog findFirstOrThrow
   */
  export type CallLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallLogs.
     */
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog findMany
   */
  export type CallLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLogs to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog create
   */
  export type CallLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CallLog.
     */
    data: XOR<CallLogCreateInput, CallLogUncheckedCreateInput>
  }

  /**
   * CallLog createMany
   */
  export type CallLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallLogs.
     */
    data: CallLogCreateManyInput | CallLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CallLog createManyAndReturn
   */
  export type CallLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * The data used to create many CallLogs.
     */
    data: CallLogCreateManyInput | CallLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallLog update
   */
  export type CallLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CallLog.
     */
    data: XOR<CallLogUpdateInput, CallLogUncheckedUpdateInput>
    /**
     * Choose, which CallLog to update.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog updateMany
   */
  export type CallLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallLogs.
     */
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyInput>
    /**
     * Filter which CallLogs to update
     */
    where?: CallLogWhereInput
  }

  /**
   * CallLog updateManyAndReturn
   */
  export type CallLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * The data used to update CallLogs.
     */
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyInput>
    /**
     * Filter which CallLogs to update
     */
    where?: CallLogWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallLog upsert
   */
  export type CallLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CallLog to update in case it exists.
     */
    where: CallLogWhereUniqueInput
    /**
     * In case the CallLog found by the `where` argument doesn't exist, create a new CallLog with this data.
     */
    create: XOR<CallLogCreateInput, CallLogUncheckedCreateInput>
    /**
     * In case the CallLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallLogUpdateInput, CallLogUncheckedUpdateInput>
  }

  /**
   * CallLog delete
   */
  export type CallLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter which CallLog to delete.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog deleteMany
   */
  export type CallLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallLogs to delete
     */
    where?: CallLogWhereInput
  }

  /**
   * CallLog.customer
   */
  export type CallLog$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalUser
     */
    select?: PortalUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalUser
     */
    omit?: PortalUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalUserInclude<ExtArgs> | null
    where?: PortalUserWhereInput
  }

  /**
   * CallLog without action
   */
  export type CallLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallLog
     */
    omit?: CallLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PortalUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    login: 'login',
    firstName: 'firstName',
    lastName: 'lastName',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortalUserScalarFieldEnum = (typeof PortalUserScalarFieldEnum)[keyof typeof PortalUserScalarFieldEnum]


  export const SupportTicketScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    priority: 'priority',
    attachmentUrl: 'attachmentUrl',
    attachmentName: 'attachmentName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    customerId: 'customerId',
    agentId: 'agentId',
    mergedIntoId: 'mergedIntoId'
  };

  export type SupportTicketScalarFieldEnum = (typeof SupportTicketScalarFieldEnum)[keyof typeof SupportTicketScalarFieldEnum]


  export const TicketMessageScalarFieldEnum: {
    id: 'id',
    ticketId: 'ticketId',
    senderId: 'senderId',
    text: 'text',
    attachmentUrl: 'attachmentUrl',
    attachmentName: 'attachmentName',
    isSystem: 'isSystem',
    createdAt: 'createdAt'
  };

  export type TicketMessageScalarFieldEnum = (typeof TicketMessageScalarFieldEnum)[keyof typeof TicketMessageScalarFieldEnum]


  export const ChatWidgetSessionScalarFieldEnum: {
    id: 'id',
    sessionKey: 'sessionKey',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatWidgetSessionScalarFieldEnum = (typeof ChatWidgetSessionScalarFieldEnum)[keyof typeof ChatWidgetSessionScalarFieldEnum]


  export const ChatWidgetMessageScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    senderType: 'senderType',
    text: 'text',
    createdAt: 'createdAt'
  };

  export type ChatWidgetMessageScalarFieldEnum = (typeof ChatWidgetMessageScalarFieldEnum)[keyof typeof ChatWidgetMessageScalarFieldEnum]


  export const VoiceSessionLogScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    customerId: 'customerId',
    transcript: 'transcript',
    audioUrl: 'audioUrl',
    duration: 'duration',
    createdAt: 'createdAt'
  };

  export type VoiceSessionLogScalarFieldEnum = (typeof VoiceSessionLogScalarFieldEnum)[keyof typeof VoiceSessionLogScalarFieldEnum]


  export const CallLogScalarFieldEnum: {
    id: 'id',
    callerNumber: 'callerNumber',
    transcript: 'transcript',
    audioUrl: 'audioUrl',
    duration: 'duration',
    createdAt: 'createdAt',
    customerId: 'customerId'
  };

  export type CallLogScalarFieldEnum = (typeof CallLogScalarFieldEnum)[keyof typeof CallLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PortalRole'
   */
  export type EnumPortalRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortalRole'>
    


  /**
   * Reference to a field of type 'PortalRole[]'
   */
  export type ListEnumPortalRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortalRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'TicketPriority'
   */
  export type EnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority'>
    


  /**
   * Reference to a field of type 'TicketPriority[]'
   */
  export type ListEnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority[]'>
    


  /**
   * Reference to a field of type 'WidgetSessionStatus'
   */
  export type EnumWidgetSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WidgetSessionStatus'>
    


  /**
   * Reference to a field of type 'WidgetSessionStatus[]'
   */
  export type ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WidgetSessionStatus[]'>
    


  /**
   * Reference to a field of type 'WidgetSenderType'
   */
  export type EnumWidgetSenderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WidgetSenderType'>
    


  /**
   * Reference to a field of type 'WidgetSenderType[]'
   */
  export type ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WidgetSenderType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PortalUserWhereInput = {
    AND?: PortalUserWhereInput | PortalUserWhereInput[]
    OR?: PortalUserWhereInput[]
    NOT?: PortalUserWhereInput | PortalUserWhereInput[]
    id?: IntFilter<"PortalUser"> | number
    email?: StringFilter<"PortalUser"> | string
    login?: StringNullableFilter<"PortalUser"> | string | null
    firstName?: StringNullableFilter<"PortalUser"> | string | null
    lastName?: StringNullableFilter<"PortalUser"> | string | null
    passwordHash?: StringFilter<"PortalUser"> | string
    role?: EnumPortalRoleFilter<"PortalUser"> | $Enums.PortalRole
    isActive?: BoolFilter<"PortalUser"> | boolean
    createdAt?: DateTimeFilter<"PortalUser"> | Date | string
    updatedAt?: DateTimeFilter<"PortalUser"> | Date | string
    raisedTickets?: SupportTicketListRelationFilter
    assignedTickets?: SupportTicketListRelationFilter
    sentMessages?: TicketMessageListRelationFilter
    voiceLogs?: VoiceSessionLogListRelationFilter
    callLogs?: CallLogListRelationFilter
  }

  export type PortalUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    login?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    raisedTickets?: SupportTicketOrderByRelationAggregateInput
    assignedTickets?: SupportTicketOrderByRelationAggregateInput
    sentMessages?: TicketMessageOrderByRelationAggregateInput
    voiceLogs?: VoiceSessionLogOrderByRelationAggregateInput
    callLogs?: CallLogOrderByRelationAggregateInput
  }

  export type PortalUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    login?: string
    AND?: PortalUserWhereInput | PortalUserWhereInput[]
    OR?: PortalUserWhereInput[]
    NOT?: PortalUserWhereInput | PortalUserWhereInput[]
    firstName?: StringNullableFilter<"PortalUser"> | string | null
    lastName?: StringNullableFilter<"PortalUser"> | string | null
    passwordHash?: StringFilter<"PortalUser"> | string
    role?: EnumPortalRoleFilter<"PortalUser"> | $Enums.PortalRole
    isActive?: BoolFilter<"PortalUser"> | boolean
    createdAt?: DateTimeFilter<"PortalUser"> | Date | string
    updatedAt?: DateTimeFilter<"PortalUser"> | Date | string
    raisedTickets?: SupportTicketListRelationFilter
    assignedTickets?: SupportTicketListRelationFilter
    sentMessages?: TicketMessageListRelationFilter
    voiceLogs?: VoiceSessionLogListRelationFilter
    callLogs?: CallLogListRelationFilter
  }, "id" | "email" | "login">

  export type PortalUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    login?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortalUserCountOrderByAggregateInput
    _avg?: PortalUserAvgOrderByAggregateInput
    _max?: PortalUserMaxOrderByAggregateInput
    _min?: PortalUserMinOrderByAggregateInput
    _sum?: PortalUserSumOrderByAggregateInput
  }

  export type PortalUserScalarWhereWithAggregatesInput = {
    AND?: PortalUserScalarWhereWithAggregatesInput | PortalUserScalarWhereWithAggregatesInput[]
    OR?: PortalUserScalarWhereWithAggregatesInput[]
    NOT?: PortalUserScalarWhereWithAggregatesInput | PortalUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PortalUser"> | number
    email?: StringWithAggregatesFilter<"PortalUser"> | string
    login?: StringNullableWithAggregatesFilter<"PortalUser"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"PortalUser"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"PortalUser"> | string | null
    passwordHash?: StringWithAggregatesFilter<"PortalUser"> | string
    role?: EnumPortalRoleWithAggregatesFilter<"PortalUser"> | $Enums.PortalRole
    isActive?: BoolWithAggregatesFilter<"PortalUser"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PortalUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PortalUser"> | Date | string
  }

  export type SupportTicketWhereInput = {
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    id?: IntFilter<"SupportTicket"> | number
    title?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    attachmentUrl?: StringNullableFilter<"SupportTicket"> | string | null
    attachmentName?: StringNullableFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    customerId?: IntFilter<"SupportTicket"> | number
    agentId?: IntNullableFilter<"SupportTicket"> | number | null
    mergedIntoId?: IntNullableFilter<"SupportTicket"> | number | null
    customer?: XOR<PortalUserScalarRelationFilter, PortalUserWhereInput>
    agent?: XOR<PortalUserNullableScalarRelationFilter, PortalUserWhereInput> | null
    messages?: TicketMessageListRelationFilter
    mergedInto?: XOR<SupportTicketNullableScalarRelationFilter, SupportTicketWhereInput> | null
    mergedTickets?: SupportTicketListRelationFilter
  }

  export type SupportTicketOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    attachmentName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customerId?: SortOrder
    agentId?: SortOrderInput | SortOrder
    mergedIntoId?: SortOrderInput | SortOrder
    customer?: PortalUserOrderByWithRelationInput
    agent?: PortalUserOrderByWithRelationInput
    messages?: TicketMessageOrderByRelationAggregateInput
    mergedInto?: SupportTicketOrderByWithRelationInput
    mergedTickets?: SupportTicketOrderByRelationAggregateInput
  }

  export type SupportTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    title?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    attachmentUrl?: StringNullableFilter<"SupportTicket"> | string | null
    attachmentName?: StringNullableFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    customerId?: IntFilter<"SupportTicket"> | number
    agentId?: IntNullableFilter<"SupportTicket"> | number | null
    mergedIntoId?: IntNullableFilter<"SupportTicket"> | number | null
    customer?: XOR<PortalUserScalarRelationFilter, PortalUserWhereInput>
    agent?: XOR<PortalUserNullableScalarRelationFilter, PortalUserWhereInput> | null
    messages?: TicketMessageListRelationFilter
    mergedInto?: XOR<SupportTicketNullableScalarRelationFilter, SupportTicketWhereInput> | null
    mergedTickets?: SupportTicketListRelationFilter
  }, "id">

  export type SupportTicketOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    attachmentName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customerId?: SortOrder
    agentId?: SortOrderInput | SortOrder
    mergedIntoId?: SortOrderInput | SortOrder
    _count?: SupportTicketCountOrderByAggregateInput
    _avg?: SupportTicketAvgOrderByAggregateInput
    _max?: SupportTicketMaxOrderByAggregateInput
    _min?: SupportTicketMinOrderByAggregateInput
    _sum?: SupportTicketSumOrderByAggregateInput
  }

  export type SupportTicketScalarWhereWithAggregatesInput = {
    AND?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    OR?: SupportTicketScalarWhereWithAggregatesInput[]
    NOT?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SupportTicket"> | number
    title?: StringWithAggregatesFilter<"SupportTicket"> | string
    description?: StringWithAggregatesFilter<"SupportTicket"> | string
    status?: EnumTicketStatusWithAggregatesFilter<"SupportTicket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityWithAggregatesFilter<"SupportTicket"> | $Enums.TicketPriority
    attachmentUrl?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    attachmentName?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
    customerId?: IntWithAggregatesFilter<"SupportTicket"> | number
    agentId?: IntNullableWithAggregatesFilter<"SupportTicket"> | number | null
    mergedIntoId?: IntNullableWithAggregatesFilter<"SupportTicket"> | number | null
  }

  export type TicketMessageWhereInput = {
    AND?: TicketMessageWhereInput | TicketMessageWhereInput[]
    OR?: TicketMessageWhereInput[]
    NOT?: TicketMessageWhereInput | TicketMessageWhereInput[]
    id?: IntFilter<"TicketMessage"> | number
    ticketId?: IntFilter<"TicketMessage"> | number
    senderId?: IntFilter<"TicketMessage"> | number
    text?: StringFilter<"TicketMessage"> | string
    attachmentUrl?: StringNullableFilter<"TicketMessage"> | string | null
    attachmentName?: StringNullableFilter<"TicketMessage"> | string | null
    isSystem?: BoolFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeFilter<"TicketMessage"> | Date | string
    ticket?: XOR<SupportTicketScalarRelationFilter, SupportTicketWhereInput>
    sender?: XOR<PortalUserScalarRelationFilter, PortalUserWhereInput>
  }

  export type TicketMessageOrderByWithRelationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    attachmentName?: SortOrderInput | SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    ticket?: SupportTicketOrderByWithRelationInput
    sender?: PortalUserOrderByWithRelationInput
  }

  export type TicketMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TicketMessageWhereInput | TicketMessageWhereInput[]
    OR?: TicketMessageWhereInput[]
    NOT?: TicketMessageWhereInput | TicketMessageWhereInput[]
    ticketId?: IntFilter<"TicketMessage"> | number
    senderId?: IntFilter<"TicketMessage"> | number
    text?: StringFilter<"TicketMessage"> | string
    attachmentUrl?: StringNullableFilter<"TicketMessage"> | string | null
    attachmentName?: StringNullableFilter<"TicketMessage"> | string | null
    isSystem?: BoolFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeFilter<"TicketMessage"> | Date | string
    ticket?: XOR<SupportTicketScalarRelationFilter, SupportTicketWhereInput>
    sender?: XOR<PortalUserScalarRelationFilter, PortalUserWhereInput>
  }, "id">

  export type TicketMessageOrderByWithAggregationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    attachmentName?: SortOrderInput | SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    _count?: TicketMessageCountOrderByAggregateInput
    _avg?: TicketMessageAvgOrderByAggregateInput
    _max?: TicketMessageMaxOrderByAggregateInput
    _min?: TicketMessageMinOrderByAggregateInput
    _sum?: TicketMessageSumOrderByAggregateInput
  }

  export type TicketMessageScalarWhereWithAggregatesInput = {
    AND?: TicketMessageScalarWhereWithAggregatesInput | TicketMessageScalarWhereWithAggregatesInput[]
    OR?: TicketMessageScalarWhereWithAggregatesInput[]
    NOT?: TicketMessageScalarWhereWithAggregatesInput | TicketMessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TicketMessage"> | number
    ticketId?: IntWithAggregatesFilter<"TicketMessage"> | number
    senderId?: IntWithAggregatesFilter<"TicketMessage"> | number
    text?: StringWithAggregatesFilter<"TicketMessage"> | string
    attachmentUrl?: StringNullableWithAggregatesFilter<"TicketMessage"> | string | null
    attachmentName?: StringNullableWithAggregatesFilter<"TicketMessage"> | string | null
    isSystem?: BoolWithAggregatesFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TicketMessage"> | Date | string
  }

  export type ChatWidgetSessionWhereInput = {
    AND?: ChatWidgetSessionWhereInput | ChatWidgetSessionWhereInput[]
    OR?: ChatWidgetSessionWhereInput[]
    NOT?: ChatWidgetSessionWhereInput | ChatWidgetSessionWhereInput[]
    id?: IntFilter<"ChatWidgetSession"> | number
    sessionKey?: StringFilter<"ChatWidgetSession"> | string
    customerName?: StringNullableFilter<"ChatWidgetSession"> | string | null
    customerEmail?: StringNullableFilter<"ChatWidgetSession"> | string | null
    status?: EnumWidgetSessionStatusFilter<"ChatWidgetSession"> | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFilter<"ChatWidgetSession"> | Date | string
    updatedAt?: DateTimeFilter<"ChatWidgetSession"> | Date | string
    messages?: ChatWidgetMessageListRelationFilter
  }

  export type ChatWidgetSessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionKey?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: ChatWidgetMessageOrderByRelationAggregateInput
  }

  export type ChatWidgetSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sessionKey?: string
    AND?: ChatWidgetSessionWhereInput | ChatWidgetSessionWhereInput[]
    OR?: ChatWidgetSessionWhereInput[]
    NOT?: ChatWidgetSessionWhereInput | ChatWidgetSessionWhereInput[]
    customerName?: StringNullableFilter<"ChatWidgetSession"> | string | null
    customerEmail?: StringNullableFilter<"ChatWidgetSession"> | string | null
    status?: EnumWidgetSessionStatusFilter<"ChatWidgetSession"> | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFilter<"ChatWidgetSession"> | Date | string
    updatedAt?: DateTimeFilter<"ChatWidgetSession"> | Date | string
    messages?: ChatWidgetMessageListRelationFilter
  }, "id" | "sessionKey">

  export type ChatWidgetSessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionKey?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatWidgetSessionCountOrderByAggregateInput
    _avg?: ChatWidgetSessionAvgOrderByAggregateInput
    _max?: ChatWidgetSessionMaxOrderByAggregateInput
    _min?: ChatWidgetSessionMinOrderByAggregateInput
    _sum?: ChatWidgetSessionSumOrderByAggregateInput
  }

  export type ChatWidgetSessionScalarWhereWithAggregatesInput = {
    AND?: ChatWidgetSessionScalarWhereWithAggregatesInput | ChatWidgetSessionScalarWhereWithAggregatesInput[]
    OR?: ChatWidgetSessionScalarWhereWithAggregatesInput[]
    NOT?: ChatWidgetSessionScalarWhereWithAggregatesInput | ChatWidgetSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChatWidgetSession"> | number
    sessionKey?: StringWithAggregatesFilter<"ChatWidgetSession"> | string
    customerName?: StringNullableWithAggregatesFilter<"ChatWidgetSession"> | string | null
    customerEmail?: StringNullableWithAggregatesFilter<"ChatWidgetSession"> | string | null
    status?: EnumWidgetSessionStatusWithAggregatesFilter<"ChatWidgetSession"> | $Enums.WidgetSessionStatus
    createdAt?: DateTimeWithAggregatesFilter<"ChatWidgetSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChatWidgetSession"> | Date | string
  }

  export type ChatWidgetMessageWhereInput = {
    AND?: ChatWidgetMessageWhereInput | ChatWidgetMessageWhereInput[]
    OR?: ChatWidgetMessageWhereInput[]
    NOT?: ChatWidgetMessageWhereInput | ChatWidgetMessageWhereInput[]
    id?: IntFilter<"ChatWidgetMessage"> | number
    sessionId?: IntFilter<"ChatWidgetMessage"> | number
    senderType?: EnumWidgetSenderTypeFilter<"ChatWidgetMessage"> | $Enums.WidgetSenderType
    text?: StringFilter<"ChatWidgetMessage"> | string
    createdAt?: DateTimeFilter<"ChatWidgetMessage"> | Date | string
    session?: XOR<ChatWidgetSessionScalarRelationFilter, ChatWidgetSessionWhereInput>
  }

  export type ChatWidgetMessageOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    senderType?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    session?: ChatWidgetSessionOrderByWithRelationInput
  }

  export type ChatWidgetMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChatWidgetMessageWhereInput | ChatWidgetMessageWhereInput[]
    OR?: ChatWidgetMessageWhereInput[]
    NOT?: ChatWidgetMessageWhereInput | ChatWidgetMessageWhereInput[]
    sessionId?: IntFilter<"ChatWidgetMessage"> | number
    senderType?: EnumWidgetSenderTypeFilter<"ChatWidgetMessage"> | $Enums.WidgetSenderType
    text?: StringFilter<"ChatWidgetMessage"> | string
    createdAt?: DateTimeFilter<"ChatWidgetMessage"> | Date | string
    session?: XOR<ChatWidgetSessionScalarRelationFilter, ChatWidgetSessionWhereInput>
  }, "id">

  export type ChatWidgetMessageOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    senderType?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    _count?: ChatWidgetMessageCountOrderByAggregateInput
    _avg?: ChatWidgetMessageAvgOrderByAggregateInput
    _max?: ChatWidgetMessageMaxOrderByAggregateInput
    _min?: ChatWidgetMessageMinOrderByAggregateInput
    _sum?: ChatWidgetMessageSumOrderByAggregateInput
  }

  export type ChatWidgetMessageScalarWhereWithAggregatesInput = {
    AND?: ChatWidgetMessageScalarWhereWithAggregatesInput | ChatWidgetMessageScalarWhereWithAggregatesInput[]
    OR?: ChatWidgetMessageScalarWhereWithAggregatesInput[]
    NOT?: ChatWidgetMessageScalarWhereWithAggregatesInput | ChatWidgetMessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChatWidgetMessage"> | number
    sessionId?: IntWithAggregatesFilter<"ChatWidgetMessage"> | number
    senderType?: EnumWidgetSenderTypeWithAggregatesFilter<"ChatWidgetMessage"> | $Enums.WidgetSenderType
    text?: StringWithAggregatesFilter<"ChatWidgetMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ChatWidgetMessage"> | Date | string
  }

  export type VoiceSessionLogWhereInput = {
    AND?: VoiceSessionLogWhereInput | VoiceSessionLogWhereInput[]
    OR?: VoiceSessionLogWhereInput[]
    NOT?: VoiceSessionLogWhereInput | VoiceSessionLogWhereInput[]
    id?: IntFilter<"VoiceSessionLog"> | number
    conversationId?: StringFilter<"VoiceSessionLog"> | string
    customerId?: IntNullableFilter<"VoiceSessionLog"> | number | null
    transcript?: StringNullableFilter<"VoiceSessionLog"> | string | null
    audioUrl?: StringNullableFilter<"VoiceSessionLog"> | string | null
    duration?: IntNullableFilter<"VoiceSessionLog"> | number | null
    createdAt?: DateTimeFilter<"VoiceSessionLog"> | Date | string
    customer?: XOR<PortalUserNullableScalarRelationFilter, PortalUserWhereInput> | null
  }

  export type VoiceSessionLogOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    customerId?: SortOrderInput | SortOrder
    transcript?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    customer?: PortalUserOrderByWithRelationInput
  }

  export type VoiceSessionLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    conversationId?: string
    AND?: VoiceSessionLogWhereInput | VoiceSessionLogWhereInput[]
    OR?: VoiceSessionLogWhereInput[]
    NOT?: VoiceSessionLogWhereInput | VoiceSessionLogWhereInput[]
    customerId?: IntNullableFilter<"VoiceSessionLog"> | number | null
    transcript?: StringNullableFilter<"VoiceSessionLog"> | string | null
    audioUrl?: StringNullableFilter<"VoiceSessionLog"> | string | null
    duration?: IntNullableFilter<"VoiceSessionLog"> | number | null
    createdAt?: DateTimeFilter<"VoiceSessionLog"> | Date | string
    customer?: XOR<PortalUserNullableScalarRelationFilter, PortalUserWhereInput> | null
  }, "id" | "conversationId">

  export type VoiceSessionLogOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    customerId?: SortOrderInput | SortOrder
    transcript?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VoiceSessionLogCountOrderByAggregateInput
    _avg?: VoiceSessionLogAvgOrderByAggregateInput
    _max?: VoiceSessionLogMaxOrderByAggregateInput
    _min?: VoiceSessionLogMinOrderByAggregateInput
    _sum?: VoiceSessionLogSumOrderByAggregateInput
  }

  export type VoiceSessionLogScalarWhereWithAggregatesInput = {
    AND?: VoiceSessionLogScalarWhereWithAggregatesInput | VoiceSessionLogScalarWhereWithAggregatesInput[]
    OR?: VoiceSessionLogScalarWhereWithAggregatesInput[]
    NOT?: VoiceSessionLogScalarWhereWithAggregatesInput | VoiceSessionLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VoiceSessionLog"> | number
    conversationId?: StringWithAggregatesFilter<"VoiceSessionLog"> | string
    customerId?: IntNullableWithAggregatesFilter<"VoiceSessionLog"> | number | null
    transcript?: StringNullableWithAggregatesFilter<"VoiceSessionLog"> | string | null
    audioUrl?: StringNullableWithAggregatesFilter<"VoiceSessionLog"> | string | null
    duration?: IntNullableWithAggregatesFilter<"VoiceSessionLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"VoiceSessionLog"> | Date | string
  }

  export type CallLogWhereInput = {
    AND?: CallLogWhereInput | CallLogWhereInput[]
    OR?: CallLogWhereInput[]
    NOT?: CallLogWhereInput | CallLogWhereInput[]
    id?: IntFilter<"CallLog"> | number
    callerNumber?: StringFilter<"CallLog"> | string
    transcript?: StringNullableFilter<"CallLog"> | string | null
    audioUrl?: StringNullableFilter<"CallLog"> | string | null
    duration?: IntNullableFilter<"CallLog"> | number | null
    createdAt?: DateTimeFilter<"CallLog"> | Date | string
    customerId?: IntNullableFilter<"CallLog"> | number | null
    customer?: XOR<PortalUserNullableScalarRelationFilter, PortalUserWhereInput> | null
  }

  export type CallLogOrderByWithRelationInput = {
    id?: SortOrder
    callerNumber?: SortOrder
    transcript?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    customerId?: SortOrderInput | SortOrder
    customer?: PortalUserOrderByWithRelationInput
  }

  export type CallLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CallLogWhereInput | CallLogWhereInput[]
    OR?: CallLogWhereInput[]
    NOT?: CallLogWhereInput | CallLogWhereInput[]
    callerNumber?: StringFilter<"CallLog"> | string
    transcript?: StringNullableFilter<"CallLog"> | string | null
    audioUrl?: StringNullableFilter<"CallLog"> | string | null
    duration?: IntNullableFilter<"CallLog"> | number | null
    createdAt?: DateTimeFilter<"CallLog"> | Date | string
    customerId?: IntNullableFilter<"CallLog"> | number | null
    customer?: XOR<PortalUserNullableScalarRelationFilter, PortalUserWhereInput> | null
  }, "id">

  export type CallLogOrderByWithAggregationInput = {
    id?: SortOrder
    callerNumber?: SortOrder
    transcript?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    customerId?: SortOrderInput | SortOrder
    _count?: CallLogCountOrderByAggregateInput
    _avg?: CallLogAvgOrderByAggregateInput
    _max?: CallLogMaxOrderByAggregateInput
    _min?: CallLogMinOrderByAggregateInput
    _sum?: CallLogSumOrderByAggregateInput
  }

  export type CallLogScalarWhereWithAggregatesInput = {
    AND?: CallLogScalarWhereWithAggregatesInput | CallLogScalarWhereWithAggregatesInput[]
    OR?: CallLogScalarWhereWithAggregatesInput[]
    NOT?: CallLogScalarWhereWithAggregatesInput | CallLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CallLog"> | number
    callerNumber?: StringWithAggregatesFilter<"CallLog"> | string
    transcript?: StringNullableWithAggregatesFilter<"CallLog"> | string | null
    audioUrl?: StringNullableWithAggregatesFilter<"CallLog"> | string | null
    duration?: IntNullableWithAggregatesFilter<"CallLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CallLog"> | Date | string
    customerId?: IntNullableWithAggregatesFilter<"CallLog"> | number | null
  }

  export type PortalUserCreateInput = {
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserUncheckedCreateInput = {
    id?: number
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketUncheckedCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogUncheckedCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUncheckedUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUncheckedUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserCreateManyInput = {
    id?: number
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalUserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketCreateInput = {
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: PortalUserCreateNestedOneWithoutRaisedTicketsInput
    agent?: PortalUserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    mergedInto?: SupportTicketCreateNestedOneWithoutMergedTicketsInput
    mergedTickets?: SupportTicketCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    agentId?: number | null
    mergedIntoId?: number | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    mergedTickets?: SupportTicketUncheckedCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: PortalUserUpdateOneRequiredWithoutRaisedTicketsNestedInput
    agent?: PortalUserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    mergedInto?: SupportTicketUpdateOneWithoutMergedTicketsNestedInput
    mergedTickets?: SupportTicketUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    mergedTickets?: SupportTicketUncheckedUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketCreateManyInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    agentId?: number | null
    mergedIntoId?: number | null
  }

  export type SupportTicketUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TicketMessageCreateInput = {
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    ticket: SupportTicketCreateNestedOneWithoutMessagesInput
    sender: PortalUserCreateNestedOneWithoutSentMessagesInput
  }

  export type TicketMessageUncheckedCreateInput = {
    id?: number
    ticketId: number
    senderId: number
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: SupportTicketUpdateOneRequiredWithoutMessagesNestedInput
    sender?: PortalUserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type TicketMessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageCreateManyInput = {
    id?: number
    ticketId: number
    senderId: number
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetSessionCreateInput = {
    sessionKey: string
    customerName?: string | null
    customerEmail?: string | null
    status?: $Enums.WidgetSessionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: ChatWidgetMessageCreateNestedManyWithoutSessionInput
  }

  export type ChatWidgetSessionUncheckedCreateInput = {
    id?: number
    sessionKey: string
    customerName?: string | null
    customerEmail?: string | null
    status?: $Enums.WidgetSessionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: ChatWidgetMessageUncheckedCreateNestedManyWithoutSessionInput
  }

  export type ChatWidgetSessionUpdateInput = {
    sessionKey?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWidgetSessionStatusFieldUpdateOperationsInput | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatWidgetMessageUpdateManyWithoutSessionNestedInput
  }

  export type ChatWidgetSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionKey?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWidgetSessionStatusFieldUpdateOperationsInput | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatWidgetMessageUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ChatWidgetSessionCreateManyInput = {
    id?: number
    sessionKey: string
    customerName?: string | null
    customerEmail?: string | null
    status?: $Enums.WidgetSessionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatWidgetSessionUpdateManyMutationInput = {
    sessionKey?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWidgetSessionStatusFieldUpdateOperationsInput | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionKey?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWidgetSessionStatusFieldUpdateOperationsInput | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetMessageCreateInput = {
    senderType: $Enums.WidgetSenderType
    text: string
    createdAt?: Date | string
    session: ChatWidgetSessionCreateNestedOneWithoutMessagesInput
  }

  export type ChatWidgetMessageUncheckedCreateInput = {
    id?: number
    sessionId: number
    senderType: $Enums.WidgetSenderType
    text: string
    createdAt?: Date | string
  }

  export type ChatWidgetMessageUpdateInput = {
    senderType?: EnumWidgetSenderTypeFieldUpdateOperationsInput | $Enums.WidgetSenderType
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: ChatWidgetSessionUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type ChatWidgetMessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    senderType?: EnumWidgetSenderTypeFieldUpdateOperationsInput | $Enums.WidgetSenderType
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetMessageCreateManyInput = {
    id?: number
    sessionId: number
    senderType: $Enums.WidgetSenderType
    text: string
    createdAt?: Date | string
  }

  export type ChatWidgetMessageUpdateManyMutationInput = {
    senderType?: EnumWidgetSenderTypeFieldUpdateOperationsInput | $Enums.WidgetSenderType
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetMessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    senderType?: EnumWidgetSenderTypeFieldUpdateOperationsInput | $Enums.WidgetSenderType
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceSessionLogCreateInput = {
    conversationId: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    customer?: PortalUserCreateNestedOneWithoutVoiceLogsInput
  }

  export type VoiceSessionLogUncheckedCreateInput = {
    id?: number
    conversationId: string
    customerId?: number | null
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type VoiceSessionLogUpdateInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: PortalUserUpdateOneWithoutVoiceLogsNestedInput
  }

  export type VoiceSessionLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversationId?: StringFieldUpdateOperationsInput | string
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceSessionLogCreateManyInput = {
    id?: number
    conversationId: string
    customerId?: number | null
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type VoiceSessionLogUpdateManyMutationInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceSessionLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversationId?: StringFieldUpdateOperationsInput | string
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogCreateInput = {
    callerNumber: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    customer?: PortalUserCreateNestedOneWithoutCallLogsInput
  }

  export type CallLogUncheckedCreateInput = {
    id?: number
    callerNumber: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    customerId?: number | null
  }

  export type CallLogUpdateInput = {
    callerNumber?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: PortalUserUpdateOneWithoutCallLogsNestedInput
  }

  export type CallLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    callerNumber?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CallLogCreateManyInput = {
    id?: number
    callerNumber: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    customerId?: number | null
  }

  export type CallLogUpdateManyMutationInput = {
    callerNumber?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    callerNumber?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPortalRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalRole | EnumPortalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalRoleFilter<$PrismaModel> | $Enums.PortalRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SupportTicketListRelationFilter = {
    every?: SupportTicketWhereInput
    some?: SupportTicketWhereInput
    none?: SupportTicketWhereInput
  }

  export type TicketMessageListRelationFilter = {
    every?: TicketMessageWhereInput
    some?: TicketMessageWhereInput
    none?: TicketMessageWhereInput
  }

  export type VoiceSessionLogListRelationFilter = {
    every?: VoiceSessionLogWhereInput
    some?: VoiceSessionLogWhereInput
    none?: VoiceSessionLogWhereInput
  }

  export type CallLogListRelationFilter = {
    every?: CallLogWhereInput
    some?: CallLogWhereInput
    none?: CallLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SupportTicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VoiceSessionLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CallLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortalUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    login?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalUserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PortalUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    login?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    login?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalUserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPortalRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalRole | EnumPortalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalRoleWithAggregatesFilter<$PrismaModel> | $Enums.PortalRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPortalRoleFilter<$PrismaModel>
    _max?: NestedEnumPortalRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type EnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PortalUserScalarRelationFilter = {
    is?: PortalUserWhereInput
    isNot?: PortalUserWhereInput
  }

  export type PortalUserNullableScalarRelationFilter = {
    is?: PortalUserWhereInput | null
    isNot?: PortalUserWhereInput | null
  }

  export type SupportTicketNullableScalarRelationFilter = {
    is?: SupportTicketWhereInput | null
    isNot?: SupportTicketWhereInput | null
  }

  export type SupportTicketCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    attachmentUrl?: SortOrder
    attachmentName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customerId?: SortOrder
    agentId?: SortOrder
    mergedIntoId?: SortOrder
  }

  export type SupportTicketAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    agentId?: SortOrder
    mergedIntoId?: SortOrder
  }

  export type SupportTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    attachmentUrl?: SortOrder
    attachmentName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customerId?: SortOrder
    agentId?: SortOrder
    mergedIntoId?: SortOrder
  }

  export type SupportTicketMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    attachmentUrl?: SortOrder
    attachmentName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customerId?: SortOrder
    agentId?: SortOrder
    mergedIntoId?: SortOrder
  }

  export type SupportTicketSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    agentId?: SortOrder
    mergedIntoId?: SortOrder
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type EnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SupportTicketScalarRelationFilter = {
    is?: SupportTicketWhereInput
    isNot?: SupportTicketWhereInput
  }

  export type TicketMessageCountOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    attachmentUrl?: SortOrder
    attachmentName?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketMessageAvgOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
  }

  export type TicketMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    attachmentUrl?: SortOrder
    attachmentName?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketMessageMinOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    attachmentUrl?: SortOrder
    attachmentName?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketMessageSumOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
  }

  export type EnumWidgetSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSessionStatus | EnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSessionStatusFilter<$PrismaModel> | $Enums.WidgetSessionStatus
  }

  export type ChatWidgetMessageListRelationFilter = {
    every?: ChatWidgetMessageWhereInput
    some?: ChatWidgetMessageWhereInput
    none?: ChatWidgetMessageWhereInput
  }

  export type ChatWidgetMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatWidgetSessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionKey?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatWidgetSessionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChatWidgetSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionKey?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatWidgetSessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionKey?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatWidgetSessionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumWidgetSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSessionStatus | EnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.WidgetSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWidgetSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumWidgetSessionStatusFilter<$PrismaModel>
  }

  export type EnumWidgetSenderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSenderType | EnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSenderTypeFilter<$PrismaModel> | $Enums.WidgetSenderType
  }

  export type ChatWidgetSessionScalarRelationFilter = {
    is?: ChatWidgetSessionWhereInput
    isNot?: ChatWidgetSessionWhereInput
  }

  export type ChatWidgetMessageCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    senderType?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatWidgetMessageAvgOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
  }

  export type ChatWidgetMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    senderType?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatWidgetMessageMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    senderType?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatWidgetMessageSumOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
  }

  export type EnumWidgetSenderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSenderType | EnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSenderTypeWithAggregatesFilter<$PrismaModel> | $Enums.WidgetSenderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWidgetSenderTypeFilter<$PrismaModel>
    _max?: NestedEnumWidgetSenderTypeFilter<$PrismaModel>
  }

  export type VoiceSessionLogCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    customerId?: SortOrder
    transcript?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type VoiceSessionLogAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    duration?: SortOrder
  }

  export type VoiceSessionLogMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    customerId?: SortOrder
    transcript?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type VoiceSessionLogMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    customerId?: SortOrder
    transcript?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type VoiceSessionLogSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    duration?: SortOrder
  }

  export type CallLogCountOrderByAggregateInput = {
    id?: SortOrder
    callerNumber?: SortOrder
    transcript?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    customerId?: SortOrder
  }

  export type CallLogAvgOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    customerId?: SortOrder
  }

  export type CallLogMaxOrderByAggregateInput = {
    id?: SortOrder
    callerNumber?: SortOrder
    transcript?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    customerId?: SortOrder
  }

  export type CallLogMinOrderByAggregateInput = {
    id?: SortOrder
    callerNumber?: SortOrder
    transcript?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    customerId?: SortOrder
  }

  export type CallLogSumOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    customerId?: SortOrder
  }

  export type SupportTicketCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SupportTicketCreateWithoutCustomerInput, SupportTicketUncheckedCreateWithoutCustomerInput> | SupportTicketCreateWithoutCustomerInput[] | SupportTicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutCustomerInput | SupportTicketCreateOrConnectWithoutCustomerInput[]
    createMany?: SupportTicketCreateManyCustomerInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type SupportTicketCreateNestedManyWithoutAgentInput = {
    create?: XOR<SupportTicketCreateWithoutAgentInput, SupportTicketUncheckedCreateWithoutAgentInput> | SupportTicketCreateWithoutAgentInput[] | SupportTicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutAgentInput | SupportTicketCreateOrConnectWithoutAgentInput[]
    createMany?: SupportTicketCreateManyAgentInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type TicketMessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type VoiceSessionLogCreateNestedManyWithoutCustomerInput = {
    create?: XOR<VoiceSessionLogCreateWithoutCustomerInput, VoiceSessionLogUncheckedCreateWithoutCustomerInput> | VoiceSessionLogCreateWithoutCustomerInput[] | VoiceSessionLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VoiceSessionLogCreateOrConnectWithoutCustomerInput | VoiceSessionLogCreateOrConnectWithoutCustomerInput[]
    createMany?: VoiceSessionLogCreateManyCustomerInputEnvelope
    connect?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
  }

  export type CallLogCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CallLogCreateWithoutCustomerInput, CallLogUncheckedCreateWithoutCustomerInput> | CallLogCreateWithoutCustomerInput[] | CallLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutCustomerInput | CallLogCreateOrConnectWithoutCustomerInput[]
    createMany?: CallLogCreateManyCustomerInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type SupportTicketUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SupportTicketCreateWithoutCustomerInput, SupportTicketUncheckedCreateWithoutCustomerInput> | SupportTicketCreateWithoutCustomerInput[] | SupportTicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutCustomerInput | SupportTicketCreateOrConnectWithoutCustomerInput[]
    createMany?: SupportTicketCreateManyCustomerInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type SupportTicketUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<SupportTicketCreateWithoutAgentInput, SupportTicketUncheckedCreateWithoutAgentInput> | SupportTicketCreateWithoutAgentInput[] | SupportTicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutAgentInput | SupportTicketCreateOrConnectWithoutAgentInput[]
    createMany?: SupportTicketCreateManyAgentInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type TicketMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type VoiceSessionLogUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<VoiceSessionLogCreateWithoutCustomerInput, VoiceSessionLogUncheckedCreateWithoutCustomerInput> | VoiceSessionLogCreateWithoutCustomerInput[] | VoiceSessionLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VoiceSessionLogCreateOrConnectWithoutCustomerInput | VoiceSessionLogCreateOrConnectWithoutCustomerInput[]
    createMany?: VoiceSessionLogCreateManyCustomerInputEnvelope
    connect?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
  }

  export type CallLogUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CallLogCreateWithoutCustomerInput, CallLogUncheckedCreateWithoutCustomerInput> | CallLogCreateWithoutCustomerInput[] | CallLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutCustomerInput | CallLogCreateOrConnectWithoutCustomerInput[]
    createMany?: CallLogCreateManyCustomerInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPortalRoleFieldUpdateOperationsInput = {
    set?: $Enums.PortalRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SupportTicketUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SupportTicketCreateWithoutCustomerInput, SupportTicketUncheckedCreateWithoutCustomerInput> | SupportTicketCreateWithoutCustomerInput[] | SupportTicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutCustomerInput | SupportTicketCreateOrConnectWithoutCustomerInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutCustomerInput | SupportTicketUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SupportTicketCreateManyCustomerInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutCustomerInput | SupportTicketUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutCustomerInput | SupportTicketUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type SupportTicketUpdateManyWithoutAgentNestedInput = {
    create?: XOR<SupportTicketCreateWithoutAgentInput, SupportTicketUncheckedCreateWithoutAgentInput> | SupportTicketCreateWithoutAgentInput[] | SupportTicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutAgentInput | SupportTicketCreateOrConnectWithoutAgentInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutAgentInput | SupportTicketUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: SupportTicketCreateManyAgentInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutAgentInput | SupportTicketUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutAgentInput | SupportTicketUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type TicketMessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutSenderInput | TicketMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutSenderInput | TicketMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutSenderInput | TicketMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type VoiceSessionLogUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<VoiceSessionLogCreateWithoutCustomerInput, VoiceSessionLogUncheckedCreateWithoutCustomerInput> | VoiceSessionLogCreateWithoutCustomerInput[] | VoiceSessionLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VoiceSessionLogCreateOrConnectWithoutCustomerInput | VoiceSessionLogCreateOrConnectWithoutCustomerInput[]
    upsert?: VoiceSessionLogUpsertWithWhereUniqueWithoutCustomerInput | VoiceSessionLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: VoiceSessionLogCreateManyCustomerInputEnvelope
    set?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    disconnect?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    delete?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    connect?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    update?: VoiceSessionLogUpdateWithWhereUniqueWithoutCustomerInput | VoiceSessionLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: VoiceSessionLogUpdateManyWithWhereWithoutCustomerInput | VoiceSessionLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: VoiceSessionLogScalarWhereInput | VoiceSessionLogScalarWhereInput[]
  }

  export type CallLogUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CallLogCreateWithoutCustomerInput, CallLogUncheckedCreateWithoutCustomerInput> | CallLogCreateWithoutCustomerInput[] | CallLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutCustomerInput | CallLogCreateOrConnectWithoutCustomerInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutCustomerInput | CallLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CallLogCreateManyCustomerInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutCustomerInput | CallLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutCustomerInput | CallLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SupportTicketUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SupportTicketCreateWithoutCustomerInput, SupportTicketUncheckedCreateWithoutCustomerInput> | SupportTicketCreateWithoutCustomerInput[] | SupportTicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutCustomerInput | SupportTicketCreateOrConnectWithoutCustomerInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutCustomerInput | SupportTicketUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SupportTicketCreateManyCustomerInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutCustomerInput | SupportTicketUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutCustomerInput | SupportTicketUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type SupportTicketUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<SupportTicketCreateWithoutAgentInput, SupportTicketUncheckedCreateWithoutAgentInput> | SupportTicketCreateWithoutAgentInput[] | SupportTicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutAgentInput | SupportTicketCreateOrConnectWithoutAgentInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutAgentInput | SupportTicketUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: SupportTicketCreateManyAgentInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutAgentInput | SupportTicketUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutAgentInput | SupportTicketUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type TicketMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutSenderInput | TicketMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutSenderInput | TicketMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutSenderInput | TicketMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type VoiceSessionLogUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<VoiceSessionLogCreateWithoutCustomerInput, VoiceSessionLogUncheckedCreateWithoutCustomerInput> | VoiceSessionLogCreateWithoutCustomerInput[] | VoiceSessionLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VoiceSessionLogCreateOrConnectWithoutCustomerInput | VoiceSessionLogCreateOrConnectWithoutCustomerInput[]
    upsert?: VoiceSessionLogUpsertWithWhereUniqueWithoutCustomerInput | VoiceSessionLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: VoiceSessionLogCreateManyCustomerInputEnvelope
    set?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    disconnect?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    delete?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    connect?: VoiceSessionLogWhereUniqueInput | VoiceSessionLogWhereUniqueInput[]
    update?: VoiceSessionLogUpdateWithWhereUniqueWithoutCustomerInput | VoiceSessionLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: VoiceSessionLogUpdateManyWithWhereWithoutCustomerInput | VoiceSessionLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: VoiceSessionLogScalarWhereInput | VoiceSessionLogScalarWhereInput[]
  }

  export type CallLogUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CallLogCreateWithoutCustomerInput, CallLogUncheckedCreateWithoutCustomerInput> | CallLogCreateWithoutCustomerInput[] | CallLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutCustomerInput | CallLogCreateOrConnectWithoutCustomerInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutCustomerInput | CallLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CallLogCreateManyCustomerInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutCustomerInput | CallLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutCustomerInput | CallLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type PortalUserCreateNestedOneWithoutRaisedTicketsInput = {
    create?: XOR<PortalUserCreateWithoutRaisedTicketsInput, PortalUserUncheckedCreateWithoutRaisedTicketsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutRaisedTicketsInput
    connect?: PortalUserWhereUniqueInput
  }

  export type PortalUserCreateNestedOneWithoutAssignedTicketsInput = {
    create?: XOR<PortalUserCreateWithoutAssignedTicketsInput, PortalUserUncheckedCreateWithoutAssignedTicketsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutAssignedTicketsInput
    connect?: PortalUserWhereUniqueInput
  }

  export type TicketMessageCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type SupportTicketCreateNestedOneWithoutMergedTicketsInput = {
    create?: XOR<SupportTicketCreateWithoutMergedTicketsInput, SupportTicketUncheckedCreateWithoutMergedTicketsInput>
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMergedTicketsInput
    connect?: SupportTicketWhereUniqueInput
  }

  export type SupportTicketCreateNestedManyWithoutMergedIntoInput = {
    create?: XOR<SupportTicketCreateWithoutMergedIntoInput, SupportTicketUncheckedCreateWithoutMergedIntoInput> | SupportTicketCreateWithoutMergedIntoInput[] | SupportTicketUncheckedCreateWithoutMergedIntoInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMergedIntoInput | SupportTicketCreateOrConnectWithoutMergedIntoInput[]
    createMany?: SupportTicketCreateManyMergedIntoInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type TicketMessageUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type SupportTicketUncheckedCreateNestedManyWithoutMergedIntoInput = {
    create?: XOR<SupportTicketCreateWithoutMergedIntoInput, SupportTicketUncheckedCreateWithoutMergedIntoInput> | SupportTicketCreateWithoutMergedIntoInput[] | SupportTicketUncheckedCreateWithoutMergedIntoInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMergedIntoInput | SupportTicketCreateOrConnectWithoutMergedIntoInput[]
    createMany?: SupportTicketCreateManyMergedIntoInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type EnumTicketPriorityFieldUpdateOperationsInput = {
    set?: $Enums.TicketPriority
  }

  export type PortalUserUpdateOneRequiredWithoutRaisedTicketsNestedInput = {
    create?: XOR<PortalUserCreateWithoutRaisedTicketsInput, PortalUserUncheckedCreateWithoutRaisedTicketsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutRaisedTicketsInput
    upsert?: PortalUserUpsertWithoutRaisedTicketsInput
    connect?: PortalUserWhereUniqueInput
    update?: XOR<XOR<PortalUserUpdateToOneWithWhereWithoutRaisedTicketsInput, PortalUserUpdateWithoutRaisedTicketsInput>, PortalUserUncheckedUpdateWithoutRaisedTicketsInput>
  }

  export type PortalUserUpdateOneWithoutAssignedTicketsNestedInput = {
    create?: XOR<PortalUserCreateWithoutAssignedTicketsInput, PortalUserUncheckedCreateWithoutAssignedTicketsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutAssignedTicketsInput
    upsert?: PortalUserUpsertWithoutAssignedTicketsInput
    disconnect?: PortalUserWhereInput | boolean
    delete?: PortalUserWhereInput | boolean
    connect?: PortalUserWhereUniqueInput
    update?: XOR<XOR<PortalUserUpdateToOneWithWhereWithoutAssignedTicketsInput, PortalUserUpdateWithoutAssignedTicketsInput>, PortalUserUncheckedUpdateWithoutAssignedTicketsInput>
  }

  export type TicketMessageUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutTicketInput | TicketMessageUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutTicketInput | TicketMessageUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutTicketInput | TicketMessageUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type SupportTicketUpdateOneWithoutMergedTicketsNestedInput = {
    create?: XOR<SupportTicketCreateWithoutMergedTicketsInput, SupportTicketUncheckedCreateWithoutMergedTicketsInput>
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMergedTicketsInput
    upsert?: SupportTicketUpsertWithoutMergedTicketsInput
    disconnect?: SupportTicketWhereInput | boolean
    delete?: SupportTicketWhereInput | boolean
    connect?: SupportTicketWhereUniqueInput
    update?: XOR<XOR<SupportTicketUpdateToOneWithWhereWithoutMergedTicketsInput, SupportTicketUpdateWithoutMergedTicketsInput>, SupportTicketUncheckedUpdateWithoutMergedTicketsInput>
  }

  export type SupportTicketUpdateManyWithoutMergedIntoNestedInput = {
    create?: XOR<SupportTicketCreateWithoutMergedIntoInput, SupportTicketUncheckedCreateWithoutMergedIntoInput> | SupportTicketCreateWithoutMergedIntoInput[] | SupportTicketUncheckedCreateWithoutMergedIntoInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMergedIntoInput | SupportTicketCreateOrConnectWithoutMergedIntoInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutMergedIntoInput | SupportTicketUpsertWithWhereUniqueWithoutMergedIntoInput[]
    createMany?: SupportTicketCreateManyMergedIntoInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutMergedIntoInput | SupportTicketUpdateWithWhereUniqueWithoutMergedIntoInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutMergedIntoInput | SupportTicketUpdateManyWithWhereWithoutMergedIntoInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TicketMessageUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutTicketInput | TicketMessageUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutTicketInput | TicketMessageUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutTicketInput | TicketMessageUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type SupportTicketUncheckedUpdateManyWithoutMergedIntoNestedInput = {
    create?: XOR<SupportTicketCreateWithoutMergedIntoInput, SupportTicketUncheckedCreateWithoutMergedIntoInput> | SupportTicketCreateWithoutMergedIntoInput[] | SupportTicketUncheckedCreateWithoutMergedIntoInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMergedIntoInput | SupportTicketCreateOrConnectWithoutMergedIntoInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutMergedIntoInput | SupportTicketUpsertWithWhereUniqueWithoutMergedIntoInput[]
    createMany?: SupportTicketCreateManyMergedIntoInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutMergedIntoInput | SupportTicketUpdateWithWhereUniqueWithoutMergedIntoInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutMergedIntoInput | SupportTicketUpdateManyWithWhereWithoutMergedIntoInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type SupportTicketCreateNestedOneWithoutMessagesInput = {
    create?: XOR<SupportTicketCreateWithoutMessagesInput, SupportTicketUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMessagesInput
    connect?: SupportTicketWhereUniqueInput
  }

  export type PortalUserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<PortalUserCreateWithoutSentMessagesInput, PortalUserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutSentMessagesInput
    connect?: PortalUserWhereUniqueInput
  }

  export type SupportTicketUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<SupportTicketCreateWithoutMessagesInput, SupportTicketUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: SupportTicketCreateOrConnectWithoutMessagesInput
    upsert?: SupportTicketUpsertWithoutMessagesInput
    connect?: SupportTicketWhereUniqueInput
    update?: XOR<XOR<SupportTicketUpdateToOneWithWhereWithoutMessagesInput, SupportTicketUpdateWithoutMessagesInput>, SupportTicketUncheckedUpdateWithoutMessagesInput>
  }

  export type PortalUserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<PortalUserCreateWithoutSentMessagesInput, PortalUserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutSentMessagesInput
    upsert?: PortalUserUpsertWithoutSentMessagesInput
    connect?: PortalUserWhereUniqueInput
    update?: XOR<XOR<PortalUserUpdateToOneWithWhereWithoutSentMessagesInput, PortalUserUpdateWithoutSentMessagesInput>, PortalUserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type ChatWidgetMessageCreateNestedManyWithoutSessionInput = {
    create?: XOR<ChatWidgetMessageCreateWithoutSessionInput, ChatWidgetMessageUncheckedCreateWithoutSessionInput> | ChatWidgetMessageCreateWithoutSessionInput[] | ChatWidgetMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ChatWidgetMessageCreateOrConnectWithoutSessionInput | ChatWidgetMessageCreateOrConnectWithoutSessionInput[]
    createMany?: ChatWidgetMessageCreateManySessionInputEnvelope
    connect?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
  }

  export type ChatWidgetMessageUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<ChatWidgetMessageCreateWithoutSessionInput, ChatWidgetMessageUncheckedCreateWithoutSessionInput> | ChatWidgetMessageCreateWithoutSessionInput[] | ChatWidgetMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ChatWidgetMessageCreateOrConnectWithoutSessionInput | ChatWidgetMessageCreateOrConnectWithoutSessionInput[]
    createMany?: ChatWidgetMessageCreateManySessionInputEnvelope
    connect?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
  }

  export type EnumWidgetSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.WidgetSessionStatus
  }

  export type ChatWidgetMessageUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ChatWidgetMessageCreateWithoutSessionInput, ChatWidgetMessageUncheckedCreateWithoutSessionInput> | ChatWidgetMessageCreateWithoutSessionInput[] | ChatWidgetMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ChatWidgetMessageCreateOrConnectWithoutSessionInput | ChatWidgetMessageCreateOrConnectWithoutSessionInput[]
    upsert?: ChatWidgetMessageUpsertWithWhereUniqueWithoutSessionInput | ChatWidgetMessageUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ChatWidgetMessageCreateManySessionInputEnvelope
    set?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    disconnect?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    delete?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    connect?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    update?: ChatWidgetMessageUpdateWithWhereUniqueWithoutSessionInput | ChatWidgetMessageUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ChatWidgetMessageUpdateManyWithWhereWithoutSessionInput | ChatWidgetMessageUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ChatWidgetMessageScalarWhereInput | ChatWidgetMessageScalarWhereInput[]
  }

  export type ChatWidgetMessageUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ChatWidgetMessageCreateWithoutSessionInput, ChatWidgetMessageUncheckedCreateWithoutSessionInput> | ChatWidgetMessageCreateWithoutSessionInput[] | ChatWidgetMessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ChatWidgetMessageCreateOrConnectWithoutSessionInput | ChatWidgetMessageCreateOrConnectWithoutSessionInput[]
    upsert?: ChatWidgetMessageUpsertWithWhereUniqueWithoutSessionInput | ChatWidgetMessageUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ChatWidgetMessageCreateManySessionInputEnvelope
    set?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    disconnect?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    delete?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    connect?: ChatWidgetMessageWhereUniqueInput | ChatWidgetMessageWhereUniqueInput[]
    update?: ChatWidgetMessageUpdateWithWhereUniqueWithoutSessionInput | ChatWidgetMessageUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ChatWidgetMessageUpdateManyWithWhereWithoutSessionInput | ChatWidgetMessageUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ChatWidgetMessageScalarWhereInput | ChatWidgetMessageScalarWhereInput[]
  }

  export type ChatWidgetSessionCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChatWidgetSessionCreateWithoutMessagesInput, ChatWidgetSessionUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatWidgetSessionCreateOrConnectWithoutMessagesInput
    connect?: ChatWidgetSessionWhereUniqueInput
  }

  export type EnumWidgetSenderTypeFieldUpdateOperationsInput = {
    set?: $Enums.WidgetSenderType
  }

  export type ChatWidgetSessionUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChatWidgetSessionCreateWithoutMessagesInput, ChatWidgetSessionUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatWidgetSessionCreateOrConnectWithoutMessagesInput
    upsert?: ChatWidgetSessionUpsertWithoutMessagesInput
    connect?: ChatWidgetSessionWhereUniqueInput
    update?: XOR<XOR<ChatWidgetSessionUpdateToOneWithWhereWithoutMessagesInput, ChatWidgetSessionUpdateWithoutMessagesInput>, ChatWidgetSessionUncheckedUpdateWithoutMessagesInput>
  }

  export type PortalUserCreateNestedOneWithoutVoiceLogsInput = {
    create?: XOR<PortalUserCreateWithoutVoiceLogsInput, PortalUserUncheckedCreateWithoutVoiceLogsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutVoiceLogsInput
    connect?: PortalUserWhereUniqueInput
  }

  export type PortalUserUpdateOneWithoutVoiceLogsNestedInput = {
    create?: XOR<PortalUserCreateWithoutVoiceLogsInput, PortalUserUncheckedCreateWithoutVoiceLogsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutVoiceLogsInput
    upsert?: PortalUserUpsertWithoutVoiceLogsInput
    disconnect?: PortalUserWhereInput | boolean
    delete?: PortalUserWhereInput | boolean
    connect?: PortalUserWhereUniqueInput
    update?: XOR<XOR<PortalUserUpdateToOneWithWhereWithoutVoiceLogsInput, PortalUserUpdateWithoutVoiceLogsInput>, PortalUserUncheckedUpdateWithoutVoiceLogsInput>
  }

  export type PortalUserCreateNestedOneWithoutCallLogsInput = {
    create?: XOR<PortalUserCreateWithoutCallLogsInput, PortalUserUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutCallLogsInput
    connect?: PortalUserWhereUniqueInput
  }

  export type PortalUserUpdateOneWithoutCallLogsNestedInput = {
    create?: XOR<PortalUserCreateWithoutCallLogsInput, PortalUserUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: PortalUserCreateOrConnectWithoutCallLogsInput
    upsert?: PortalUserUpsertWithoutCallLogsInput
    disconnect?: PortalUserWhereInput | boolean
    delete?: PortalUserWhereInput | boolean
    connect?: PortalUserWhereUniqueInput
    update?: XOR<XOR<PortalUserUpdateToOneWithWhereWithoutCallLogsInput, PortalUserUpdateWithoutCallLogsInput>, PortalUserUncheckedUpdateWithoutCallLogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPortalRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalRole | EnumPortalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalRoleFilter<$PrismaModel> | $Enums.PortalRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPortalRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalRole | EnumPortalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalRole[] | ListEnumPortalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalRoleWithAggregatesFilter<$PrismaModel> | $Enums.PortalRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPortalRoleFilter<$PrismaModel>
    _max?: NestedEnumPortalRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumWidgetSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSessionStatus | EnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSessionStatusFilter<$PrismaModel> | $Enums.WidgetSessionStatus
  }

  export type NestedEnumWidgetSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSessionStatus | EnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSessionStatus[] | ListEnumWidgetSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.WidgetSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWidgetSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumWidgetSessionStatusFilter<$PrismaModel>
  }

  export type NestedEnumWidgetSenderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSenderType | EnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSenderTypeFilter<$PrismaModel> | $Enums.WidgetSenderType
  }

  export type NestedEnumWidgetSenderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WidgetSenderType | EnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WidgetSenderType[] | ListEnumWidgetSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWidgetSenderTypeWithAggregatesFilter<$PrismaModel> | $Enums.WidgetSenderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWidgetSenderTypeFilter<$PrismaModel>
    _max?: NestedEnumWidgetSenderTypeFilter<$PrismaModel>
  }

  export type SupportTicketCreateWithoutCustomerInput = {
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent?: PortalUserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    mergedInto?: SupportTicketCreateNestedOneWithoutMergedTicketsInput
    mergedTickets?: SupportTicketCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketUncheckedCreateWithoutCustomerInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentId?: number | null
    mergedIntoId?: number | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    mergedTickets?: SupportTicketUncheckedCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketCreateOrConnectWithoutCustomerInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutCustomerInput, SupportTicketUncheckedCreateWithoutCustomerInput>
  }

  export type SupportTicketCreateManyCustomerInputEnvelope = {
    data: SupportTicketCreateManyCustomerInput | SupportTicketCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type SupportTicketCreateWithoutAgentInput = {
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: PortalUserCreateNestedOneWithoutRaisedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    mergedInto?: SupportTicketCreateNestedOneWithoutMergedTicketsInput
    mergedTickets?: SupportTicketCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketUncheckedCreateWithoutAgentInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    mergedIntoId?: number | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    mergedTickets?: SupportTicketUncheckedCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketCreateOrConnectWithoutAgentInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutAgentInput, SupportTicketUncheckedCreateWithoutAgentInput>
  }

  export type SupportTicketCreateManyAgentInputEnvelope = {
    data: SupportTicketCreateManyAgentInput | SupportTicketCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type TicketMessageCreateWithoutSenderInput = {
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    ticket: SupportTicketCreateNestedOneWithoutMessagesInput
  }

  export type TicketMessageUncheckedCreateWithoutSenderInput = {
    id?: number
    ticketId: number
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageCreateOrConnectWithoutSenderInput = {
    where: TicketMessageWhereUniqueInput
    create: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput>
  }

  export type TicketMessageCreateManySenderInputEnvelope = {
    data: TicketMessageCreateManySenderInput | TicketMessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type VoiceSessionLogCreateWithoutCustomerInput = {
    conversationId: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type VoiceSessionLogUncheckedCreateWithoutCustomerInput = {
    id?: number
    conversationId: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type VoiceSessionLogCreateOrConnectWithoutCustomerInput = {
    where: VoiceSessionLogWhereUniqueInput
    create: XOR<VoiceSessionLogCreateWithoutCustomerInput, VoiceSessionLogUncheckedCreateWithoutCustomerInput>
  }

  export type VoiceSessionLogCreateManyCustomerInputEnvelope = {
    data: VoiceSessionLogCreateManyCustomerInput | VoiceSessionLogCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CallLogCreateWithoutCustomerInput = {
    callerNumber: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type CallLogUncheckedCreateWithoutCustomerInput = {
    id?: number
    callerNumber: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type CallLogCreateOrConnectWithoutCustomerInput = {
    where: CallLogWhereUniqueInput
    create: XOR<CallLogCreateWithoutCustomerInput, CallLogUncheckedCreateWithoutCustomerInput>
  }

  export type CallLogCreateManyCustomerInputEnvelope = {
    data: CallLogCreateManyCustomerInput | CallLogCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutCustomerInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutCustomerInput, SupportTicketUncheckedUpdateWithoutCustomerInput>
    create: XOR<SupportTicketCreateWithoutCustomerInput, SupportTicketUncheckedCreateWithoutCustomerInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutCustomerInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutCustomerInput, SupportTicketUncheckedUpdateWithoutCustomerInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutCustomerInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutCustomerInput>
  }

  export type SupportTicketScalarWhereInput = {
    AND?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    OR?: SupportTicketScalarWhereInput[]
    NOT?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    id?: IntFilter<"SupportTicket"> | number
    title?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    attachmentUrl?: StringNullableFilter<"SupportTicket"> | string | null
    attachmentName?: StringNullableFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    customerId?: IntFilter<"SupportTicket"> | number
    agentId?: IntNullableFilter<"SupportTicket"> | number | null
    mergedIntoId?: IntNullableFilter<"SupportTicket"> | number | null
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutAgentInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutAgentInput, SupportTicketUncheckedUpdateWithoutAgentInput>
    create: XOR<SupportTicketCreateWithoutAgentInput, SupportTicketUncheckedCreateWithoutAgentInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutAgentInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutAgentInput, SupportTicketUncheckedUpdateWithoutAgentInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutAgentInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutAgentInput>
  }

  export type TicketMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: TicketMessageWhereUniqueInput
    update: XOR<TicketMessageUpdateWithoutSenderInput, TicketMessageUncheckedUpdateWithoutSenderInput>
    create: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput>
  }

  export type TicketMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: TicketMessageWhereUniqueInput
    data: XOR<TicketMessageUpdateWithoutSenderInput, TicketMessageUncheckedUpdateWithoutSenderInput>
  }

  export type TicketMessageUpdateManyWithWhereWithoutSenderInput = {
    where: TicketMessageScalarWhereInput
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type TicketMessageScalarWhereInput = {
    AND?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
    OR?: TicketMessageScalarWhereInput[]
    NOT?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
    id?: IntFilter<"TicketMessage"> | number
    ticketId?: IntFilter<"TicketMessage"> | number
    senderId?: IntFilter<"TicketMessage"> | number
    text?: StringFilter<"TicketMessage"> | string
    attachmentUrl?: StringNullableFilter<"TicketMessage"> | string | null
    attachmentName?: StringNullableFilter<"TicketMessage"> | string | null
    isSystem?: BoolFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeFilter<"TicketMessage"> | Date | string
  }

  export type VoiceSessionLogUpsertWithWhereUniqueWithoutCustomerInput = {
    where: VoiceSessionLogWhereUniqueInput
    update: XOR<VoiceSessionLogUpdateWithoutCustomerInput, VoiceSessionLogUncheckedUpdateWithoutCustomerInput>
    create: XOR<VoiceSessionLogCreateWithoutCustomerInput, VoiceSessionLogUncheckedCreateWithoutCustomerInput>
  }

  export type VoiceSessionLogUpdateWithWhereUniqueWithoutCustomerInput = {
    where: VoiceSessionLogWhereUniqueInput
    data: XOR<VoiceSessionLogUpdateWithoutCustomerInput, VoiceSessionLogUncheckedUpdateWithoutCustomerInput>
  }

  export type VoiceSessionLogUpdateManyWithWhereWithoutCustomerInput = {
    where: VoiceSessionLogScalarWhereInput
    data: XOR<VoiceSessionLogUpdateManyMutationInput, VoiceSessionLogUncheckedUpdateManyWithoutCustomerInput>
  }

  export type VoiceSessionLogScalarWhereInput = {
    AND?: VoiceSessionLogScalarWhereInput | VoiceSessionLogScalarWhereInput[]
    OR?: VoiceSessionLogScalarWhereInput[]
    NOT?: VoiceSessionLogScalarWhereInput | VoiceSessionLogScalarWhereInput[]
    id?: IntFilter<"VoiceSessionLog"> | number
    conversationId?: StringFilter<"VoiceSessionLog"> | string
    customerId?: IntNullableFilter<"VoiceSessionLog"> | number | null
    transcript?: StringNullableFilter<"VoiceSessionLog"> | string | null
    audioUrl?: StringNullableFilter<"VoiceSessionLog"> | string | null
    duration?: IntNullableFilter<"VoiceSessionLog"> | number | null
    createdAt?: DateTimeFilter<"VoiceSessionLog"> | Date | string
  }

  export type CallLogUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CallLogWhereUniqueInput
    update: XOR<CallLogUpdateWithoutCustomerInput, CallLogUncheckedUpdateWithoutCustomerInput>
    create: XOR<CallLogCreateWithoutCustomerInput, CallLogUncheckedCreateWithoutCustomerInput>
  }

  export type CallLogUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CallLogWhereUniqueInput
    data: XOR<CallLogUpdateWithoutCustomerInput, CallLogUncheckedUpdateWithoutCustomerInput>
  }

  export type CallLogUpdateManyWithWhereWithoutCustomerInput = {
    where: CallLogScalarWhereInput
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CallLogScalarWhereInput = {
    AND?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
    OR?: CallLogScalarWhereInput[]
    NOT?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
    id?: IntFilter<"CallLog"> | number
    callerNumber?: StringFilter<"CallLog"> | string
    transcript?: StringNullableFilter<"CallLog"> | string | null
    audioUrl?: StringNullableFilter<"CallLog"> | string | null
    duration?: IntNullableFilter<"CallLog"> | number | null
    createdAt?: DateTimeFilter<"CallLog"> | Date | string
    customerId?: IntNullableFilter<"CallLog"> | number | null
  }

  export type PortalUserCreateWithoutRaisedTicketsInput = {
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTickets?: SupportTicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserUncheckedCreateWithoutRaisedTicketsInput = {
    id?: number
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTickets?: SupportTicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogUncheckedCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserCreateOrConnectWithoutRaisedTicketsInput = {
    where: PortalUserWhereUniqueInput
    create: XOR<PortalUserCreateWithoutRaisedTicketsInput, PortalUserUncheckedCreateWithoutRaisedTicketsInput>
  }

  export type PortalUserCreateWithoutAssignedTicketsInput = {
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketCreateNestedManyWithoutCustomerInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserUncheckedCreateWithoutAssignedTicketsInput = {
    id?: number
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketUncheckedCreateNestedManyWithoutCustomerInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogUncheckedCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserCreateOrConnectWithoutAssignedTicketsInput = {
    where: PortalUserWhereUniqueInput
    create: XOR<PortalUserCreateWithoutAssignedTicketsInput, PortalUserUncheckedCreateWithoutAssignedTicketsInput>
  }

  export type TicketMessageCreateWithoutTicketInput = {
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    sender: PortalUserCreateNestedOneWithoutSentMessagesInput
  }

  export type TicketMessageUncheckedCreateWithoutTicketInput = {
    id?: number
    senderId: number
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageCreateOrConnectWithoutTicketInput = {
    where: TicketMessageWhereUniqueInput
    create: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput>
  }

  export type TicketMessageCreateManyTicketInputEnvelope = {
    data: TicketMessageCreateManyTicketInput | TicketMessageCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type SupportTicketCreateWithoutMergedTicketsInput = {
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: PortalUserCreateNestedOneWithoutRaisedTicketsInput
    agent?: PortalUserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    mergedInto?: SupportTicketCreateNestedOneWithoutMergedTicketsInput
  }

  export type SupportTicketUncheckedCreateWithoutMergedTicketsInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    agentId?: number | null
    mergedIntoId?: number | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
  }

  export type SupportTicketCreateOrConnectWithoutMergedTicketsInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutMergedTicketsInput, SupportTicketUncheckedCreateWithoutMergedTicketsInput>
  }

  export type SupportTicketCreateWithoutMergedIntoInput = {
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: PortalUserCreateNestedOneWithoutRaisedTicketsInput
    agent?: PortalUserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    mergedTickets?: SupportTicketCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketUncheckedCreateWithoutMergedIntoInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    agentId?: number | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    mergedTickets?: SupportTicketUncheckedCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketCreateOrConnectWithoutMergedIntoInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutMergedIntoInput, SupportTicketUncheckedCreateWithoutMergedIntoInput>
  }

  export type SupportTicketCreateManyMergedIntoInputEnvelope = {
    data: SupportTicketCreateManyMergedIntoInput | SupportTicketCreateManyMergedIntoInput[]
    skipDuplicates?: boolean
  }

  export type PortalUserUpsertWithoutRaisedTicketsInput = {
    update: XOR<PortalUserUpdateWithoutRaisedTicketsInput, PortalUserUncheckedUpdateWithoutRaisedTicketsInput>
    create: XOR<PortalUserCreateWithoutRaisedTicketsInput, PortalUserUncheckedCreateWithoutRaisedTicketsInput>
    where?: PortalUserWhereInput
  }

  export type PortalUserUpdateToOneWithWhereWithoutRaisedTicketsInput = {
    where?: PortalUserWhereInput
    data: XOR<PortalUserUpdateWithoutRaisedTicketsInput, PortalUserUncheckedUpdateWithoutRaisedTicketsInput>
  }

  export type PortalUserUpdateWithoutRaisedTicketsInput = {
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTickets?: SupportTicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserUncheckedUpdateWithoutRaisedTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTickets?: SupportTicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUncheckedUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserUpsertWithoutAssignedTicketsInput = {
    update: XOR<PortalUserUpdateWithoutAssignedTicketsInput, PortalUserUncheckedUpdateWithoutAssignedTicketsInput>
    create: XOR<PortalUserCreateWithoutAssignedTicketsInput, PortalUserUncheckedCreateWithoutAssignedTicketsInput>
    where?: PortalUserWhereInput
  }

  export type PortalUserUpdateToOneWithWhereWithoutAssignedTicketsInput = {
    where?: PortalUserWhereInput
    data: XOR<PortalUserUpdateWithoutAssignedTicketsInput, PortalUserUncheckedUpdateWithoutAssignedTicketsInput>
  }

  export type PortalUserUpdateWithoutAssignedTicketsInput = {
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUpdateManyWithoutCustomerNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserUncheckedUpdateWithoutAssignedTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUncheckedUpdateManyWithoutCustomerNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUncheckedUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type TicketMessageUpsertWithWhereUniqueWithoutTicketInput = {
    where: TicketMessageWhereUniqueInput
    update: XOR<TicketMessageUpdateWithoutTicketInput, TicketMessageUncheckedUpdateWithoutTicketInput>
    create: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput>
  }

  export type TicketMessageUpdateWithWhereUniqueWithoutTicketInput = {
    where: TicketMessageWhereUniqueInput
    data: XOR<TicketMessageUpdateWithoutTicketInput, TicketMessageUncheckedUpdateWithoutTicketInput>
  }

  export type TicketMessageUpdateManyWithWhereWithoutTicketInput = {
    where: TicketMessageScalarWhereInput
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyWithoutTicketInput>
  }

  export type SupportTicketUpsertWithoutMergedTicketsInput = {
    update: XOR<SupportTicketUpdateWithoutMergedTicketsInput, SupportTicketUncheckedUpdateWithoutMergedTicketsInput>
    create: XOR<SupportTicketCreateWithoutMergedTicketsInput, SupportTicketUncheckedCreateWithoutMergedTicketsInput>
    where?: SupportTicketWhereInput
  }

  export type SupportTicketUpdateToOneWithWhereWithoutMergedTicketsInput = {
    where?: SupportTicketWhereInput
    data: XOR<SupportTicketUpdateWithoutMergedTicketsInput, SupportTicketUncheckedUpdateWithoutMergedTicketsInput>
  }

  export type SupportTicketUpdateWithoutMergedTicketsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: PortalUserUpdateOneRequiredWithoutRaisedTicketsNestedInput
    agent?: PortalUserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    mergedInto?: SupportTicketUpdateOneWithoutMergedTicketsNestedInput
  }

  export type SupportTicketUncheckedUpdateWithoutMergedTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutMergedIntoInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutMergedIntoInput, SupportTicketUncheckedUpdateWithoutMergedIntoInput>
    create: XOR<SupportTicketCreateWithoutMergedIntoInput, SupportTicketUncheckedCreateWithoutMergedIntoInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutMergedIntoInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutMergedIntoInput, SupportTicketUncheckedUpdateWithoutMergedIntoInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutMergedIntoInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutMergedIntoInput>
  }

  export type SupportTicketCreateWithoutMessagesInput = {
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: PortalUserCreateNestedOneWithoutRaisedTicketsInput
    agent?: PortalUserCreateNestedOneWithoutAssignedTicketsInput
    mergedInto?: SupportTicketCreateNestedOneWithoutMergedTicketsInput
    mergedTickets?: SupportTicketCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketUncheckedCreateWithoutMessagesInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    agentId?: number | null
    mergedIntoId?: number | null
    mergedTickets?: SupportTicketUncheckedCreateNestedManyWithoutMergedIntoInput
  }

  export type SupportTicketCreateOrConnectWithoutMessagesInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutMessagesInput, SupportTicketUncheckedCreateWithoutMessagesInput>
  }

  export type PortalUserCreateWithoutSentMessagesInput = {
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketCreateNestedManyWithoutAgentInput
    voiceLogs?: VoiceSessionLogCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserUncheckedCreateWithoutSentMessagesInput = {
    id?: number
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketUncheckedCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketUncheckedCreateNestedManyWithoutAgentInput
    voiceLogs?: VoiceSessionLogUncheckedCreateNestedManyWithoutCustomerInput
    callLogs?: CallLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserCreateOrConnectWithoutSentMessagesInput = {
    where: PortalUserWhereUniqueInput
    create: XOR<PortalUserCreateWithoutSentMessagesInput, PortalUserUncheckedCreateWithoutSentMessagesInput>
  }

  export type SupportTicketUpsertWithoutMessagesInput = {
    update: XOR<SupportTicketUpdateWithoutMessagesInput, SupportTicketUncheckedUpdateWithoutMessagesInput>
    create: XOR<SupportTicketCreateWithoutMessagesInput, SupportTicketUncheckedCreateWithoutMessagesInput>
    where?: SupportTicketWhereInput
  }

  export type SupportTicketUpdateToOneWithWhereWithoutMessagesInput = {
    where?: SupportTicketWhereInput
    data: XOR<SupportTicketUpdateWithoutMessagesInput, SupportTicketUncheckedUpdateWithoutMessagesInput>
  }

  export type SupportTicketUpdateWithoutMessagesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: PortalUserUpdateOneRequiredWithoutRaisedTicketsNestedInput
    agent?: PortalUserUpdateOneWithoutAssignedTicketsNestedInput
    mergedInto?: SupportTicketUpdateOneWithoutMergedTicketsNestedInput
    mergedTickets?: SupportTicketUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
    mergedTickets?: SupportTicketUncheckedUpdateManyWithoutMergedIntoNestedInput
  }

  export type PortalUserUpsertWithoutSentMessagesInput = {
    update: XOR<PortalUserUpdateWithoutSentMessagesInput, PortalUserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<PortalUserCreateWithoutSentMessagesInput, PortalUserUncheckedCreateWithoutSentMessagesInput>
    where?: PortalUserWhereInput
  }

  export type PortalUserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: PortalUserWhereInput
    data: XOR<PortalUserUpdateWithoutSentMessagesInput, PortalUserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type PortalUserUpdateWithoutSentMessagesInput = {
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUpdateManyWithoutAgentNestedInput
    voiceLogs?: VoiceSessionLogUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserUncheckedUpdateWithoutSentMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUncheckedUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUncheckedUpdateManyWithoutAgentNestedInput
    voiceLogs?: VoiceSessionLogUncheckedUpdateManyWithoutCustomerNestedInput
    callLogs?: CallLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type ChatWidgetMessageCreateWithoutSessionInput = {
    senderType: $Enums.WidgetSenderType
    text: string
    createdAt?: Date | string
  }

  export type ChatWidgetMessageUncheckedCreateWithoutSessionInput = {
    id?: number
    senderType: $Enums.WidgetSenderType
    text: string
    createdAt?: Date | string
  }

  export type ChatWidgetMessageCreateOrConnectWithoutSessionInput = {
    where: ChatWidgetMessageWhereUniqueInput
    create: XOR<ChatWidgetMessageCreateWithoutSessionInput, ChatWidgetMessageUncheckedCreateWithoutSessionInput>
  }

  export type ChatWidgetMessageCreateManySessionInputEnvelope = {
    data: ChatWidgetMessageCreateManySessionInput | ChatWidgetMessageCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type ChatWidgetMessageUpsertWithWhereUniqueWithoutSessionInput = {
    where: ChatWidgetMessageWhereUniqueInput
    update: XOR<ChatWidgetMessageUpdateWithoutSessionInput, ChatWidgetMessageUncheckedUpdateWithoutSessionInput>
    create: XOR<ChatWidgetMessageCreateWithoutSessionInput, ChatWidgetMessageUncheckedCreateWithoutSessionInput>
  }

  export type ChatWidgetMessageUpdateWithWhereUniqueWithoutSessionInput = {
    where: ChatWidgetMessageWhereUniqueInput
    data: XOR<ChatWidgetMessageUpdateWithoutSessionInput, ChatWidgetMessageUncheckedUpdateWithoutSessionInput>
  }

  export type ChatWidgetMessageUpdateManyWithWhereWithoutSessionInput = {
    where: ChatWidgetMessageScalarWhereInput
    data: XOR<ChatWidgetMessageUpdateManyMutationInput, ChatWidgetMessageUncheckedUpdateManyWithoutSessionInput>
  }

  export type ChatWidgetMessageScalarWhereInput = {
    AND?: ChatWidgetMessageScalarWhereInput | ChatWidgetMessageScalarWhereInput[]
    OR?: ChatWidgetMessageScalarWhereInput[]
    NOT?: ChatWidgetMessageScalarWhereInput | ChatWidgetMessageScalarWhereInput[]
    id?: IntFilter<"ChatWidgetMessage"> | number
    sessionId?: IntFilter<"ChatWidgetMessage"> | number
    senderType?: EnumWidgetSenderTypeFilter<"ChatWidgetMessage"> | $Enums.WidgetSenderType
    text?: StringFilter<"ChatWidgetMessage"> | string
    createdAt?: DateTimeFilter<"ChatWidgetMessage"> | Date | string
  }

  export type ChatWidgetSessionCreateWithoutMessagesInput = {
    sessionKey: string
    customerName?: string | null
    customerEmail?: string | null
    status?: $Enums.WidgetSessionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatWidgetSessionUncheckedCreateWithoutMessagesInput = {
    id?: number
    sessionKey: string
    customerName?: string | null
    customerEmail?: string | null
    status?: $Enums.WidgetSessionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatWidgetSessionCreateOrConnectWithoutMessagesInput = {
    where: ChatWidgetSessionWhereUniqueInput
    create: XOR<ChatWidgetSessionCreateWithoutMessagesInput, ChatWidgetSessionUncheckedCreateWithoutMessagesInput>
  }

  export type ChatWidgetSessionUpsertWithoutMessagesInput = {
    update: XOR<ChatWidgetSessionUpdateWithoutMessagesInput, ChatWidgetSessionUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChatWidgetSessionCreateWithoutMessagesInput, ChatWidgetSessionUncheckedCreateWithoutMessagesInput>
    where?: ChatWidgetSessionWhereInput
  }

  export type ChatWidgetSessionUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChatWidgetSessionWhereInput
    data: XOR<ChatWidgetSessionUpdateWithoutMessagesInput, ChatWidgetSessionUncheckedUpdateWithoutMessagesInput>
  }

  export type ChatWidgetSessionUpdateWithoutMessagesInput = {
    sessionKey?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWidgetSessionStatusFieldUpdateOperationsInput | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetSessionUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionKey?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumWidgetSessionStatusFieldUpdateOperationsInput | $Enums.WidgetSessionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalUserCreateWithoutVoiceLogsInput = {
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    callLogs?: CallLogCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserUncheckedCreateWithoutVoiceLogsInput = {
    id?: number
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketUncheckedCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    callLogs?: CallLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserCreateOrConnectWithoutVoiceLogsInput = {
    where: PortalUserWhereUniqueInput
    create: XOR<PortalUserCreateWithoutVoiceLogsInput, PortalUserUncheckedCreateWithoutVoiceLogsInput>
  }

  export type PortalUserUpsertWithoutVoiceLogsInput = {
    update: XOR<PortalUserUpdateWithoutVoiceLogsInput, PortalUserUncheckedUpdateWithoutVoiceLogsInput>
    create: XOR<PortalUserCreateWithoutVoiceLogsInput, PortalUserUncheckedCreateWithoutVoiceLogsInput>
    where?: PortalUserWhereInput
  }

  export type PortalUserUpdateToOneWithWhereWithoutVoiceLogsInput = {
    where?: PortalUserWhereInput
    data: XOR<PortalUserUpdateWithoutVoiceLogsInput, PortalUserUncheckedUpdateWithoutVoiceLogsInput>
  }

  export type PortalUserUpdateWithoutVoiceLogsInput = {
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    callLogs?: CallLogUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserUncheckedUpdateWithoutVoiceLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUncheckedUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    callLogs?: CallLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserCreateWithoutCallLogsInput = {
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserUncheckedCreateWithoutCallLogsInput = {
    id?: number
    email: string
    login?: string | null
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    role?: $Enums.PortalRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    raisedTickets?: SupportTicketUncheckedCreateNestedManyWithoutCustomerInput
    assignedTickets?: SupportTicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    voiceLogs?: VoiceSessionLogUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type PortalUserCreateOrConnectWithoutCallLogsInput = {
    where: PortalUserWhereUniqueInput
    create: XOR<PortalUserCreateWithoutCallLogsInput, PortalUserUncheckedCreateWithoutCallLogsInput>
  }

  export type PortalUserUpsertWithoutCallLogsInput = {
    update: XOR<PortalUserUpdateWithoutCallLogsInput, PortalUserUncheckedUpdateWithoutCallLogsInput>
    create: XOR<PortalUserCreateWithoutCallLogsInput, PortalUserUncheckedCreateWithoutCallLogsInput>
    where?: PortalUserWhereInput
  }

  export type PortalUserUpdateToOneWithWhereWithoutCallLogsInput = {
    where?: PortalUserWhereInput
    data: XOR<PortalUserUpdateWithoutCallLogsInput, PortalUserUncheckedUpdateWithoutCallLogsInput>
  }

  export type PortalUserUpdateWithoutCallLogsInput = {
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUpdateManyWithoutCustomerNestedInput
  }

  export type PortalUserUncheckedUpdateWithoutCallLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumPortalRoleFieldUpdateOperationsInput | $Enums.PortalRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    raisedTickets?: SupportTicketUncheckedUpdateManyWithoutCustomerNestedInput
    assignedTickets?: SupportTicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    voiceLogs?: VoiceSessionLogUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type SupportTicketCreateManyCustomerInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentId?: number | null
    mergedIntoId?: number | null
  }

  export type SupportTicketCreateManyAgentInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    mergedIntoId?: number | null
  }

  export type TicketMessageCreateManySenderInput = {
    id?: number
    ticketId: number
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
  }

  export type VoiceSessionLogCreateManyCustomerInput = {
    id?: number
    conversationId: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type CallLogCreateManyCustomerInput = {
    id?: number
    callerNumber: string
    transcript?: string | null
    audioUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type SupportTicketUpdateWithoutCustomerInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: PortalUserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    mergedInto?: SupportTicketUpdateOneWithoutMergedTicketsNestedInput
    mergedTickets?: SupportTicketUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    mergedTickets?: SupportTicketUncheckedUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SupportTicketUpdateWithoutAgentInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: PortalUserUpdateOneRequiredWithoutRaisedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    mergedInto?: SupportTicketUpdateOneWithoutMergedTicketsNestedInput
    mergedTickets?: SupportTicketUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    mergedTickets?: SupportTicketUncheckedUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateManyWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    mergedIntoId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TicketMessageUpdateWithoutSenderInput = {
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: SupportTicketUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type TicketMessageUncheckedUpdateWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceSessionLogUpdateWithoutCustomerInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceSessionLogUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversationId?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceSessionLogUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversationId?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUpdateWithoutCustomerInput = {
    callerNumber?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    callerNumber?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    callerNumber?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageCreateManyTicketInput = {
    id?: number
    senderId: number
    text: string
    attachmentUrl?: string | null
    attachmentName?: string | null
    isSystem?: boolean
    createdAt?: Date | string
  }

  export type SupportTicketCreateManyMergedIntoInput = {
    id?: number
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    attachmentUrl?: string | null
    attachmentName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customerId: number
    agentId?: number | null
  }

  export type TicketMessageUpdateWithoutTicketInput = {
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: PortalUserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type TicketMessageUncheckedUpdateWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageUncheckedUpdateManyWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUpdateWithoutMergedIntoInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: PortalUserUpdateOneRequiredWithoutRaisedTicketsNestedInput
    agent?: PortalUserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    mergedTickets?: SupportTicketUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateWithoutMergedIntoInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    mergedTickets?: SupportTicketUncheckedUpdateManyWithoutMergedIntoNestedInput
  }

  export type SupportTicketUncheckedUpdateManyWithoutMergedIntoInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: IntFieldUpdateOperationsInput | number
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ChatWidgetMessageCreateManySessionInput = {
    id?: number
    senderType: $Enums.WidgetSenderType
    text: string
    createdAt?: Date | string
  }

  export type ChatWidgetMessageUpdateWithoutSessionInput = {
    senderType?: EnumWidgetSenderTypeFieldUpdateOperationsInput | $Enums.WidgetSenderType
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetMessageUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderType?: EnumWidgetSenderTypeFieldUpdateOperationsInput | $Enums.WidgetSenderType
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatWidgetMessageUncheckedUpdateManyWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderType?: EnumWidgetSenderTypeFieldUpdateOperationsInput | $Enums.WidgetSenderType
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}