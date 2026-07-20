
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
 * Model Contestant
 * 
 */
export type Contestant = $Result.DefaultSelection<Prisma.$ContestantPayload>
/**
 * Model Juror
 * 
 */
export type Juror = $Result.DefaultSelection<Prisma.$JurorPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Rating
 * 
 */
export type Rating = $Result.DefaultSelection<Prisma.$RatingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Contestants
 * const contestants = await prisma.contestant.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Contestants
   * const contestants = await prisma.contestant.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.contestant`: Exposes CRUD operations for the **Contestant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contestants
    * const contestants = await prisma.contestant.findMany()
    * ```
    */
  get contestant(): Prisma.ContestantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.juror`: Exposes CRUD operations for the **Juror** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jurors
    * const jurors = await prisma.juror.findMany()
    * ```
    */
  get juror(): Prisma.JurorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rating`: Exposes CRUD operations for the **Rating** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratings
    * const ratings = await prisma.rating.findMany()
    * ```
    */
  get rating(): Prisma.RatingDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Contestant: 'Contestant',
    Juror: 'Juror',
    Category: 'Category',
    Rating: 'Rating'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "contestant" | "juror" | "category" | "rating"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Contestant: {
        payload: Prisma.$ContestantPayload<ExtArgs>
        fields: Prisma.ContestantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContestantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContestantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>
          }
          findFirst: {
            args: Prisma.ContestantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContestantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>
          }
          findMany: {
            args: Prisma.ContestantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>[]
          }
          create: {
            args: Prisma.ContestantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>
          }
          createMany: {
            args: Prisma.ContestantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContestantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>[]
          }
          delete: {
            args: Prisma.ContestantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>
          }
          update: {
            args: Prisma.ContestantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>
          }
          deleteMany: {
            args: Prisma.ContestantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContestantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContestantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>[]
          }
          upsert: {
            args: Prisma.ContestantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestantPayload>
          }
          aggregate: {
            args: Prisma.ContestantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContestant>
          }
          groupBy: {
            args: Prisma.ContestantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContestantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContestantCountArgs<ExtArgs>
            result: $Utils.Optional<ContestantCountAggregateOutputType> | number
          }
        }
      }
      Juror: {
        payload: Prisma.$JurorPayload<ExtArgs>
        fields: Prisma.JurorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JurorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JurorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>
          }
          findFirst: {
            args: Prisma.JurorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JurorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>
          }
          findMany: {
            args: Prisma.JurorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>[]
          }
          create: {
            args: Prisma.JurorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>
          }
          createMany: {
            args: Prisma.JurorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JurorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>[]
          }
          delete: {
            args: Prisma.JurorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>
          }
          update: {
            args: Prisma.JurorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>
          }
          deleteMany: {
            args: Prisma.JurorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JurorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JurorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>[]
          }
          upsert: {
            args: Prisma.JurorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurorPayload>
          }
          aggregate: {
            args: Prisma.JurorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJuror>
          }
          groupBy: {
            args: Prisma.JurorGroupByArgs<ExtArgs>
            result: $Utils.Optional<JurorGroupByOutputType>[]
          }
          count: {
            args: Prisma.JurorCountArgs<ExtArgs>
            result: $Utils.Optional<JurorCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Rating: {
        payload: Prisma.$RatingPayload<ExtArgs>
        fields: Prisma.RatingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findFirst: {
            args: Prisma.RatingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findMany: {
            args: Prisma.RatingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          create: {
            args: Prisma.RatingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          createMany: {
            args: Prisma.RatingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          delete: {
            args: Prisma.RatingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          update: {
            args: Prisma.RatingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          deleteMany: {
            args: Prisma.RatingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RatingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          upsert: {
            args: Prisma.RatingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          aggregate: {
            args: Prisma.RatingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRating>
          }
          groupBy: {
            args: Prisma.RatingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatingCountArgs<ExtArgs>
            result: $Utils.Optional<RatingCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    contestant?: ContestantOmit
    juror?: JurorOmit
    category?: CategoryOmit
    rating?: RatingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type ContestantCountOutputType
   */

  export type ContestantCountOutputType = {
    ratings: number
  }

  export type ContestantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | ContestantCountOutputTypeCountRatingsArgs
  }

  // Custom InputTypes
  /**
   * ContestantCountOutputType without action
   */
  export type ContestantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestantCountOutputType
     */
    select?: ContestantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContestantCountOutputType without action
   */
  export type ContestantCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }


  /**
   * Count Type JurorCountOutputType
   */

  export type JurorCountOutputType = {
    ratings: number
  }

  export type JurorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | JurorCountOutputTypeCountRatingsArgs
  }

  // Custom InputTypes
  /**
   * JurorCountOutputType without action
   */
  export type JurorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurorCountOutputType
     */
    select?: JurorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JurorCountOutputType without action
   */
  export type JurorCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    ratings: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | CategoryCountOutputTypeCountRatingsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Contestant
   */

  export type AggregateContestant = {
    _count: ContestantCountAggregateOutputType | null
    _avg: ContestantAvgAggregateOutputType | null
    _sum: ContestantSumAggregateOutputType | null
    _min: ContestantMinAggregateOutputType | null
    _max: ContestantMaxAggregateOutputType | null
  }

  export type ContestantAvgAggregateOutputType = {
    id: number | null
    age: number | null
  }

  export type ContestantSumAggregateOutputType = {
    id: number | null
    age: number | null
  }

  export type ContestantMinAggregateOutputType = {
    id: number | null
    pseudo: string | null
    password: string | null
    age: number | null
    prenom: string | null
    createdAt: Date | null
  }

  export type ContestantMaxAggregateOutputType = {
    id: number | null
    pseudo: string | null
    password: string | null
    age: number | null
    prenom: string | null
    createdAt: Date | null
  }

  export type ContestantCountAggregateOutputType = {
    id: number
    pseudo: number
    password: number
    age: number
    prenom: number
    createdAt: number
    _all: number
  }


  export type ContestantAvgAggregateInputType = {
    id?: true
    age?: true
  }

  export type ContestantSumAggregateInputType = {
    id?: true
    age?: true
  }

  export type ContestantMinAggregateInputType = {
    id?: true
    pseudo?: true
    password?: true
    age?: true
    prenom?: true
    createdAt?: true
  }

  export type ContestantMaxAggregateInputType = {
    id?: true
    pseudo?: true
    password?: true
    age?: true
    prenom?: true
    createdAt?: true
  }

  export type ContestantCountAggregateInputType = {
    id?: true
    pseudo?: true
    password?: true
    age?: true
    prenom?: true
    createdAt?: true
    _all?: true
  }

  export type ContestantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contestant to aggregate.
     */
    where?: ContestantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contestants to fetch.
     */
    orderBy?: ContestantOrderByWithRelationInput | ContestantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContestantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contestants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contestants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contestants
    **/
    _count?: true | ContestantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContestantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContestantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContestantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContestantMaxAggregateInputType
  }

  export type GetContestantAggregateType<T extends ContestantAggregateArgs> = {
        [P in keyof T & keyof AggregateContestant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContestant[P]>
      : GetScalarType<T[P], AggregateContestant[P]>
  }




  export type ContestantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContestantWhereInput
    orderBy?: ContestantOrderByWithAggregationInput | ContestantOrderByWithAggregationInput[]
    by: ContestantScalarFieldEnum[] | ContestantScalarFieldEnum
    having?: ContestantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContestantCountAggregateInputType | true
    _avg?: ContestantAvgAggregateInputType
    _sum?: ContestantSumAggregateInputType
    _min?: ContestantMinAggregateInputType
    _max?: ContestantMaxAggregateInputType
  }

  export type ContestantGroupByOutputType = {
    id: number
    pseudo: string
    password: string
    age: number
    prenom: string
    createdAt: Date
    _count: ContestantCountAggregateOutputType | null
    _avg: ContestantAvgAggregateOutputType | null
    _sum: ContestantSumAggregateOutputType | null
    _min: ContestantMinAggregateOutputType | null
    _max: ContestantMaxAggregateOutputType | null
  }

  type GetContestantGroupByPayload<T extends ContestantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContestantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContestantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContestantGroupByOutputType[P]>
            : GetScalarType<T[P], ContestantGroupByOutputType[P]>
        }
      >
    >


  export type ContestantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    password?: boolean
    age?: boolean
    prenom?: boolean
    createdAt?: boolean
    ratings?: boolean | Contestant$ratingsArgs<ExtArgs>
    _count?: boolean | ContestantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contestant"]>

  export type ContestantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    password?: boolean
    age?: boolean
    prenom?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contestant"]>

  export type ContestantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    password?: boolean
    age?: boolean
    prenom?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contestant"]>

  export type ContestantSelectScalar = {
    id?: boolean
    pseudo?: boolean
    password?: boolean
    age?: boolean
    prenom?: boolean
    createdAt?: boolean
  }

  export type ContestantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pseudo" | "password" | "age" | "prenom" | "createdAt", ExtArgs["result"]["contestant"]>
  export type ContestantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | Contestant$ratingsArgs<ExtArgs>
    _count?: boolean | ContestantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContestantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContestantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContestantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contestant"
    objects: {
      ratings: Prisma.$RatingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pseudo: string
      password: string
      age: number
      prenom: string
      createdAt: Date
    }, ExtArgs["result"]["contestant"]>
    composites: {}
  }

  type ContestantGetPayload<S extends boolean | null | undefined | ContestantDefaultArgs> = $Result.GetResult<Prisma.$ContestantPayload, S>

  type ContestantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContestantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContestantCountAggregateInputType | true
    }

  export interface ContestantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contestant'], meta: { name: 'Contestant' } }
    /**
     * Find zero or one Contestant that matches the filter.
     * @param {ContestantFindUniqueArgs} args - Arguments to find a Contestant
     * @example
     * // Get one Contestant
     * const contestant = await prisma.contestant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContestantFindUniqueArgs>(args: SelectSubset<T, ContestantFindUniqueArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contestant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContestantFindUniqueOrThrowArgs} args - Arguments to find a Contestant
     * @example
     * // Get one Contestant
     * const contestant = await prisma.contestant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContestantFindUniqueOrThrowArgs>(args: SelectSubset<T, ContestantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contestant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestantFindFirstArgs} args - Arguments to find a Contestant
     * @example
     * // Get one Contestant
     * const contestant = await prisma.contestant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContestantFindFirstArgs>(args?: SelectSubset<T, ContestantFindFirstArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contestant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestantFindFirstOrThrowArgs} args - Arguments to find a Contestant
     * @example
     * // Get one Contestant
     * const contestant = await prisma.contestant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContestantFindFirstOrThrowArgs>(args?: SelectSubset<T, ContestantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contestants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contestants
     * const contestants = await prisma.contestant.findMany()
     * 
     * // Get first 10 Contestants
     * const contestants = await prisma.contestant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contestantWithIdOnly = await prisma.contestant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContestantFindManyArgs>(args?: SelectSubset<T, ContestantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contestant.
     * @param {ContestantCreateArgs} args - Arguments to create a Contestant.
     * @example
     * // Create one Contestant
     * const Contestant = await prisma.contestant.create({
     *   data: {
     *     // ... data to create a Contestant
     *   }
     * })
     * 
     */
    create<T extends ContestantCreateArgs>(args: SelectSubset<T, ContestantCreateArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contestants.
     * @param {ContestantCreateManyArgs} args - Arguments to create many Contestants.
     * @example
     * // Create many Contestants
     * const contestant = await prisma.contestant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContestantCreateManyArgs>(args?: SelectSubset<T, ContestantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contestants and returns the data saved in the database.
     * @param {ContestantCreateManyAndReturnArgs} args - Arguments to create many Contestants.
     * @example
     * // Create many Contestants
     * const contestant = await prisma.contestant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contestants and only return the `id`
     * const contestantWithIdOnly = await prisma.contestant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContestantCreateManyAndReturnArgs>(args?: SelectSubset<T, ContestantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contestant.
     * @param {ContestantDeleteArgs} args - Arguments to delete one Contestant.
     * @example
     * // Delete one Contestant
     * const Contestant = await prisma.contestant.delete({
     *   where: {
     *     // ... filter to delete one Contestant
     *   }
     * })
     * 
     */
    delete<T extends ContestantDeleteArgs>(args: SelectSubset<T, ContestantDeleteArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contestant.
     * @param {ContestantUpdateArgs} args - Arguments to update one Contestant.
     * @example
     * // Update one Contestant
     * const contestant = await prisma.contestant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContestantUpdateArgs>(args: SelectSubset<T, ContestantUpdateArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contestants.
     * @param {ContestantDeleteManyArgs} args - Arguments to filter Contestants to delete.
     * @example
     * // Delete a few Contestants
     * const { count } = await prisma.contestant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContestantDeleteManyArgs>(args?: SelectSubset<T, ContestantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contestants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contestants
     * const contestant = await prisma.contestant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContestantUpdateManyArgs>(args: SelectSubset<T, ContestantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contestants and returns the data updated in the database.
     * @param {ContestantUpdateManyAndReturnArgs} args - Arguments to update many Contestants.
     * @example
     * // Update many Contestants
     * const contestant = await prisma.contestant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contestants and only return the `id`
     * const contestantWithIdOnly = await prisma.contestant.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContestantUpdateManyAndReturnArgs>(args: SelectSubset<T, ContestantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contestant.
     * @param {ContestantUpsertArgs} args - Arguments to update or create a Contestant.
     * @example
     * // Update or create a Contestant
     * const contestant = await prisma.contestant.upsert({
     *   create: {
     *     // ... data to create a Contestant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contestant we want to update
     *   }
     * })
     */
    upsert<T extends ContestantUpsertArgs>(args: SelectSubset<T, ContestantUpsertArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contestants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestantCountArgs} args - Arguments to filter Contestants to count.
     * @example
     * // Count the number of Contestants
     * const count = await prisma.contestant.count({
     *   where: {
     *     // ... the filter for the Contestants we want to count
     *   }
     * })
    **/
    count<T extends ContestantCountArgs>(
      args?: Subset<T, ContestantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContestantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contestant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContestantAggregateArgs>(args: Subset<T, ContestantAggregateArgs>): Prisma.PrismaPromise<GetContestantAggregateType<T>>

    /**
     * Group by Contestant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestantGroupByArgs} args - Group by arguments.
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
      T extends ContestantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContestantGroupByArgs['orderBy'] }
        : { orderBy?: ContestantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContestantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContestantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contestant model
   */
  readonly fields: ContestantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contestant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContestantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ratings<T extends Contestant$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, Contestant$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Contestant model
   */
  interface ContestantFieldRefs {
    readonly id: FieldRef<"Contestant", 'Int'>
    readonly pseudo: FieldRef<"Contestant", 'String'>
    readonly password: FieldRef<"Contestant", 'String'>
    readonly age: FieldRef<"Contestant", 'Int'>
    readonly prenom: FieldRef<"Contestant", 'String'>
    readonly createdAt: FieldRef<"Contestant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contestant findUnique
   */
  export type ContestantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * Filter, which Contestant to fetch.
     */
    where: ContestantWhereUniqueInput
  }

  /**
   * Contestant findUniqueOrThrow
   */
  export type ContestantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * Filter, which Contestant to fetch.
     */
    where: ContestantWhereUniqueInput
  }

  /**
   * Contestant findFirst
   */
  export type ContestantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * Filter, which Contestant to fetch.
     */
    where?: ContestantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contestants to fetch.
     */
    orderBy?: ContestantOrderByWithRelationInput | ContestantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contestants.
     */
    cursor?: ContestantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contestants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contestants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contestants.
     */
    distinct?: ContestantScalarFieldEnum | ContestantScalarFieldEnum[]
  }

  /**
   * Contestant findFirstOrThrow
   */
  export type ContestantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * Filter, which Contestant to fetch.
     */
    where?: ContestantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contestants to fetch.
     */
    orderBy?: ContestantOrderByWithRelationInput | ContestantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contestants.
     */
    cursor?: ContestantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contestants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contestants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contestants.
     */
    distinct?: ContestantScalarFieldEnum | ContestantScalarFieldEnum[]
  }

  /**
   * Contestant findMany
   */
  export type ContestantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * Filter, which Contestants to fetch.
     */
    where?: ContestantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contestants to fetch.
     */
    orderBy?: ContestantOrderByWithRelationInput | ContestantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contestants.
     */
    cursor?: ContestantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contestants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contestants.
     */
    skip?: number
    distinct?: ContestantScalarFieldEnum | ContestantScalarFieldEnum[]
  }

  /**
   * Contestant create
   */
  export type ContestantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * The data needed to create a Contestant.
     */
    data: XOR<ContestantCreateInput, ContestantUncheckedCreateInput>
  }

  /**
   * Contestant createMany
   */
  export type ContestantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contestants.
     */
    data: ContestantCreateManyInput | ContestantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contestant createManyAndReturn
   */
  export type ContestantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * The data used to create many Contestants.
     */
    data: ContestantCreateManyInput | ContestantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contestant update
   */
  export type ContestantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * The data needed to update a Contestant.
     */
    data: XOR<ContestantUpdateInput, ContestantUncheckedUpdateInput>
    /**
     * Choose, which Contestant to update.
     */
    where: ContestantWhereUniqueInput
  }

  /**
   * Contestant updateMany
   */
  export type ContestantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contestants.
     */
    data: XOR<ContestantUpdateManyMutationInput, ContestantUncheckedUpdateManyInput>
    /**
     * Filter which Contestants to update
     */
    where?: ContestantWhereInput
    /**
     * Limit how many Contestants to update.
     */
    limit?: number
  }

  /**
   * Contestant updateManyAndReturn
   */
  export type ContestantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * The data used to update Contestants.
     */
    data: XOR<ContestantUpdateManyMutationInput, ContestantUncheckedUpdateManyInput>
    /**
     * Filter which Contestants to update
     */
    where?: ContestantWhereInput
    /**
     * Limit how many Contestants to update.
     */
    limit?: number
  }

  /**
   * Contestant upsert
   */
  export type ContestantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * The filter to search for the Contestant to update in case it exists.
     */
    where: ContestantWhereUniqueInput
    /**
     * In case the Contestant found by the `where` argument doesn't exist, create a new Contestant with this data.
     */
    create: XOR<ContestantCreateInput, ContestantUncheckedCreateInput>
    /**
     * In case the Contestant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContestantUpdateInput, ContestantUncheckedUpdateInput>
  }

  /**
   * Contestant delete
   */
  export type ContestantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
    /**
     * Filter which Contestant to delete.
     */
    where: ContestantWhereUniqueInput
  }

  /**
   * Contestant deleteMany
   */
  export type ContestantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contestants to delete
     */
    where?: ContestantWhereInput
    /**
     * Limit how many Contestants to delete.
     */
    limit?: number
  }

  /**
   * Contestant.ratings
   */
  export type Contestant$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Contestant without action
   */
  export type ContestantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contestant
     */
    select?: ContestantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contestant
     */
    omit?: ContestantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestantInclude<ExtArgs> | null
  }


  /**
   * Model Juror
   */

  export type AggregateJuror = {
    _count: JurorCountAggregateOutputType | null
    _avg: JurorAvgAggregateOutputType | null
    _sum: JurorSumAggregateOutputType | null
    _min: JurorMinAggregateOutputType | null
    _max: JurorMaxAggregateOutputType | null
  }

  export type JurorAvgAggregateOutputType = {
    id: number | null
    coeff: number | null
    validationsCount: number | null
  }

  export type JurorSumAggregateOutputType = {
    id: number | null
    coeff: number | null
    validationsCount: number | null
  }

  export type JurorMinAggregateOutputType = {
    id: number | null
    pseudo: string | null
    email: string | null
    type: string | null
    coeff: number | null
    validated: boolean | null
    validationsCount: number | null
    createdAt: Date | null
  }

  export type JurorMaxAggregateOutputType = {
    id: number | null
    pseudo: string | null
    email: string | null
    type: string | null
    coeff: number | null
    validated: boolean | null
    validationsCount: number | null
    createdAt: Date | null
  }

  export type JurorCountAggregateOutputType = {
    id: number
    pseudo: number
    email: number
    type: number
    coeff: number
    validated: number
    validationsCount: number
    createdAt: number
    _all: number
  }


  export type JurorAvgAggregateInputType = {
    id?: true
    coeff?: true
    validationsCount?: true
  }

  export type JurorSumAggregateInputType = {
    id?: true
    coeff?: true
    validationsCount?: true
  }

  export type JurorMinAggregateInputType = {
    id?: true
    pseudo?: true
    email?: true
    type?: true
    coeff?: true
    validated?: true
    validationsCount?: true
    createdAt?: true
  }

  export type JurorMaxAggregateInputType = {
    id?: true
    pseudo?: true
    email?: true
    type?: true
    coeff?: true
    validated?: true
    validationsCount?: true
    createdAt?: true
  }

  export type JurorCountAggregateInputType = {
    id?: true
    pseudo?: true
    email?: true
    type?: true
    coeff?: true
    validated?: true
    validationsCount?: true
    createdAt?: true
    _all?: true
  }

  export type JurorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Juror to aggregate.
     */
    where?: JurorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jurors to fetch.
     */
    orderBy?: JurorOrderByWithRelationInput | JurorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JurorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jurors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jurors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jurors
    **/
    _count?: true | JurorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JurorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JurorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JurorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JurorMaxAggregateInputType
  }

  export type GetJurorAggregateType<T extends JurorAggregateArgs> = {
        [P in keyof T & keyof AggregateJuror]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJuror[P]>
      : GetScalarType<T[P], AggregateJuror[P]>
  }




  export type JurorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JurorWhereInput
    orderBy?: JurorOrderByWithAggregationInput | JurorOrderByWithAggregationInput[]
    by: JurorScalarFieldEnum[] | JurorScalarFieldEnum
    having?: JurorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JurorCountAggregateInputType | true
    _avg?: JurorAvgAggregateInputType
    _sum?: JurorSumAggregateInputType
    _min?: JurorMinAggregateInputType
    _max?: JurorMaxAggregateInputType
  }

  export type JurorGroupByOutputType = {
    id: number
    pseudo: string
    email: string
    type: string
    coeff: number
    validated: boolean
    validationsCount: number
    createdAt: Date
    _count: JurorCountAggregateOutputType | null
    _avg: JurorAvgAggregateOutputType | null
    _sum: JurorSumAggregateOutputType | null
    _min: JurorMinAggregateOutputType | null
    _max: JurorMaxAggregateOutputType | null
  }

  type GetJurorGroupByPayload<T extends JurorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JurorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JurorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JurorGroupByOutputType[P]>
            : GetScalarType<T[P], JurorGroupByOutputType[P]>
        }
      >
    >


  export type JurorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    email?: boolean
    type?: boolean
    coeff?: boolean
    validated?: boolean
    validationsCount?: boolean
    createdAt?: boolean
    ratings?: boolean | Juror$ratingsArgs<ExtArgs>
    _count?: boolean | JurorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["juror"]>

  export type JurorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    email?: boolean
    type?: boolean
    coeff?: boolean
    validated?: boolean
    validationsCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["juror"]>

  export type JurorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    email?: boolean
    type?: boolean
    coeff?: boolean
    validated?: boolean
    validationsCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["juror"]>

  export type JurorSelectScalar = {
    id?: boolean
    pseudo?: boolean
    email?: boolean
    type?: boolean
    coeff?: boolean
    validated?: boolean
    validationsCount?: boolean
    createdAt?: boolean
  }

  export type JurorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pseudo" | "email" | "type" | "coeff" | "validated" | "validationsCount" | "createdAt", ExtArgs["result"]["juror"]>
  export type JurorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | Juror$ratingsArgs<ExtArgs>
    _count?: boolean | JurorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JurorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type JurorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JurorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Juror"
    objects: {
      ratings: Prisma.$RatingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pseudo: string
      email: string
      type: string
      coeff: number
      validated: boolean
      validationsCount: number
      createdAt: Date
    }, ExtArgs["result"]["juror"]>
    composites: {}
  }

  type JurorGetPayload<S extends boolean | null | undefined | JurorDefaultArgs> = $Result.GetResult<Prisma.$JurorPayload, S>

  type JurorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JurorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JurorCountAggregateInputType | true
    }

  export interface JurorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Juror'], meta: { name: 'Juror' } }
    /**
     * Find zero or one Juror that matches the filter.
     * @param {JurorFindUniqueArgs} args - Arguments to find a Juror
     * @example
     * // Get one Juror
     * const juror = await prisma.juror.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JurorFindUniqueArgs>(args: SelectSubset<T, JurorFindUniqueArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Juror that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JurorFindUniqueOrThrowArgs} args - Arguments to find a Juror
     * @example
     * // Get one Juror
     * const juror = await prisma.juror.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JurorFindUniqueOrThrowArgs>(args: SelectSubset<T, JurorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Juror that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurorFindFirstArgs} args - Arguments to find a Juror
     * @example
     * // Get one Juror
     * const juror = await prisma.juror.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JurorFindFirstArgs>(args?: SelectSubset<T, JurorFindFirstArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Juror that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurorFindFirstOrThrowArgs} args - Arguments to find a Juror
     * @example
     * // Get one Juror
     * const juror = await prisma.juror.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JurorFindFirstOrThrowArgs>(args?: SelectSubset<T, JurorFindFirstOrThrowArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jurors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jurors
     * const jurors = await prisma.juror.findMany()
     * 
     * // Get first 10 Jurors
     * const jurors = await prisma.juror.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jurorWithIdOnly = await prisma.juror.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JurorFindManyArgs>(args?: SelectSubset<T, JurorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Juror.
     * @param {JurorCreateArgs} args - Arguments to create a Juror.
     * @example
     * // Create one Juror
     * const Juror = await prisma.juror.create({
     *   data: {
     *     // ... data to create a Juror
     *   }
     * })
     * 
     */
    create<T extends JurorCreateArgs>(args: SelectSubset<T, JurorCreateArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jurors.
     * @param {JurorCreateManyArgs} args - Arguments to create many Jurors.
     * @example
     * // Create many Jurors
     * const juror = await prisma.juror.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JurorCreateManyArgs>(args?: SelectSubset<T, JurorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jurors and returns the data saved in the database.
     * @param {JurorCreateManyAndReturnArgs} args - Arguments to create many Jurors.
     * @example
     * // Create many Jurors
     * const juror = await prisma.juror.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jurors and only return the `id`
     * const jurorWithIdOnly = await prisma.juror.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JurorCreateManyAndReturnArgs>(args?: SelectSubset<T, JurorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Juror.
     * @param {JurorDeleteArgs} args - Arguments to delete one Juror.
     * @example
     * // Delete one Juror
     * const Juror = await prisma.juror.delete({
     *   where: {
     *     // ... filter to delete one Juror
     *   }
     * })
     * 
     */
    delete<T extends JurorDeleteArgs>(args: SelectSubset<T, JurorDeleteArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Juror.
     * @param {JurorUpdateArgs} args - Arguments to update one Juror.
     * @example
     * // Update one Juror
     * const juror = await prisma.juror.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JurorUpdateArgs>(args: SelectSubset<T, JurorUpdateArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jurors.
     * @param {JurorDeleteManyArgs} args - Arguments to filter Jurors to delete.
     * @example
     * // Delete a few Jurors
     * const { count } = await prisma.juror.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JurorDeleteManyArgs>(args?: SelectSubset<T, JurorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jurors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jurors
     * const juror = await prisma.juror.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JurorUpdateManyArgs>(args: SelectSubset<T, JurorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jurors and returns the data updated in the database.
     * @param {JurorUpdateManyAndReturnArgs} args - Arguments to update many Jurors.
     * @example
     * // Update many Jurors
     * const juror = await prisma.juror.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jurors and only return the `id`
     * const jurorWithIdOnly = await prisma.juror.updateManyAndReturn({
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
    updateManyAndReturn<T extends JurorUpdateManyAndReturnArgs>(args: SelectSubset<T, JurorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Juror.
     * @param {JurorUpsertArgs} args - Arguments to update or create a Juror.
     * @example
     * // Update or create a Juror
     * const juror = await prisma.juror.upsert({
     *   create: {
     *     // ... data to create a Juror
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Juror we want to update
     *   }
     * })
     */
    upsert<T extends JurorUpsertArgs>(args: SelectSubset<T, JurorUpsertArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jurors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurorCountArgs} args - Arguments to filter Jurors to count.
     * @example
     * // Count the number of Jurors
     * const count = await prisma.juror.count({
     *   where: {
     *     // ... the filter for the Jurors we want to count
     *   }
     * })
    **/
    count<T extends JurorCountArgs>(
      args?: Subset<T, JurorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JurorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Juror.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JurorAggregateArgs>(args: Subset<T, JurorAggregateArgs>): Prisma.PrismaPromise<GetJurorAggregateType<T>>

    /**
     * Group by Juror.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurorGroupByArgs} args - Group by arguments.
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
      T extends JurorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JurorGroupByArgs['orderBy'] }
        : { orderBy?: JurorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JurorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJurorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Juror model
   */
  readonly fields: JurorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Juror.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JurorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ratings<T extends Juror$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, Juror$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Juror model
   */
  interface JurorFieldRefs {
    readonly id: FieldRef<"Juror", 'Int'>
    readonly pseudo: FieldRef<"Juror", 'String'>
    readonly email: FieldRef<"Juror", 'String'>
    readonly type: FieldRef<"Juror", 'String'>
    readonly coeff: FieldRef<"Juror", 'Int'>
    readonly validated: FieldRef<"Juror", 'Boolean'>
    readonly validationsCount: FieldRef<"Juror", 'Int'>
    readonly createdAt: FieldRef<"Juror", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Juror findUnique
   */
  export type JurorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * Filter, which Juror to fetch.
     */
    where: JurorWhereUniqueInput
  }

  /**
   * Juror findUniqueOrThrow
   */
  export type JurorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * Filter, which Juror to fetch.
     */
    where: JurorWhereUniqueInput
  }

  /**
   * Juror findFirst
   */
  export type JurorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * Filter, which Juror to fetch.
     */
    where?: JurorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jurors to fetch.
     */
    orderBy?: JurorOrderByWithRelationInput | JurorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jurors.
     */
    cursor?: JurorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jurors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jurors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jurors.
     */
    distinct?: JurorScalarFieldEnum | JurorScalarFieldEnum[]
  }

  /**
   * Juror findFirstOrThrow
   */
  export type JurorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * Filter, which Juror to fetch.
     */
    where?: JurorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jurors to fetch.
     */
    orderBy?: JurorOrderByWithRelationInput | JurorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jurors.
     */
    cursor?: JurorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jurors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jurors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jurors.
     */
    distinct?: JurorScalarFieldEnum | JurorScalarFieldEnum[]
  }

  /**
   * Juror findMany
   */
  export type JurorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * Filter, which Jurors to fetch.
     */
    where?: JurorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jurors to fetch.
     */
    orderBy?: JurorOrderByWithRelationInput | JurorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jurors.
     */
    cursor?: JurorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jurors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jurors.
     */
    skip?: number
    distinct?: JurorScalarFieldEnum | JurorScalarFieldEnum[]
  }

  /**
   * Juror create
   */
  export type JurorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * The data needed to create a Juror.
     */
    data: XOR<JurorCreateInput, JurorUncheckedCreateInput>
  }

  /**
   * Juror createMany
   */
  export type JurorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jurors.
     */
    data: JurorCreateManyInput | JurorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Juror createManyAndReturn
   */
  export type JurorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * The data used to create many Jurors.
     */
    data: JurorCreateManyInput | JurorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Juror update
   */
  export type JurorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * The data needed to update a Juror.
     */
    data: XOR<JurorUpdateInput, JurorUncheckedUpdateInput>
    /**
     * Choose, which Juror to update.
     */
    where: JurorWhereUniqueInput
  }

  /**
   * Juror updateMany
   */
  export type JurorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jurors.
     */
    data: XOR<JurorUpdateManyMutationInput, JurorUncheckedUpdateManyInput>
    /**
     * Filter which Jurors to update
     */
    where?: JurorWhereInput
    /**
     * Limit how many Jurors to update.
     */
    limit?: number
  }

  /**
   * Juror updateManyAndReturn
   */
  export type JurorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * The data used to update Jurors.
     */
    data: XOR<JurorUpdateManyMutationInput, JurorUncheckedUpdateManyInput>
    /**
     * Filter which Jurors to update
     */
    where?: JurorWhereInput
    /**
     * Limit how many Jurors to update.
     */
    limit?: number
  }

  /**
   * Juror upsert
   */
  export type JurorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * The filter to search for the Juror to update in case it exists.
     */
    where: JurorWhereUniqueInput
    /**
     * In case the Juror found by the `where` argument doesn't exist, create a new Juror with this data.
     */
    create: XOR<JurorCreateInput, JurorUncheckedCreateInput>
    /**
     * In case the Juror was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JurorUpdateInput, JurorUncheckedUpdateInput>
  }

  /**
   * Juror delete
   */
  export type JurorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
    /**
     * Filter which Juror to delete.
     */
    where: JurorWhereUniqueInput
  }

  /**
   * Juror deleteMany
   */
  export type JurorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jurors to delete
     */
    where?: JurorWhereInput
    /**
     * Limit how many Jurors to delete.
     */
    limit?: number
  }

  /**
   * Juror.ratings
   */
  export type Juror$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Juror without action
   */
  export type JurorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juror
     */
    select?: JurorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juror
     */
    omit?: JurorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurorInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ratings?: boolean | Category$ratingsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | Category$ratingsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      ratings: Prisma.$RatingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
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
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ratings<T extends Category$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, Category$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.ratings
   */
  export type Category$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Rating
   */

  export type AggregateRating = {
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  export type RatingAvgAggregateOutputType = {
    id: number | null
    contestantId: number | null
    jurorId: number | null
    categoryId: number | null
    value: number | null
  }

  export type RatingSumAggregateOutputType = {
    id: number | null
    contestantId: number | null
    jurorId: number | null
    categoryId: number | null
    value: number | null
  }

  export type RatingMinAggregateOutputType = {
    id: number | null
    contestantId: number | null
    jurorId: number | null
    categoryId: number | null
    value: number | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type RatingMaxAggregateOutputType = {
    id: number | null
    contestantId: number | null
    jurorId: number | null
    categoryId: number | null
    value: number | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type RatingCountAggregateOutputType = {
    id: number
    contestantId: number
    jurorId: number
    categoryId: number
    value: number
    photoUrl: number
    createdAt: number
    _all: number
  }


  export type RatingAvgAggregateInputType = {
    id?: true
    contestantId?: true
    jurorId?: true
    categoryId?: true
    value?: true
  }

  export type RatingSumAggregateInputType = {
    id?: true
    contestantId?: true
    jurorId?: true
    categoryId?: true
    value?: true
  }

  export type RatingMinAggregateInputType = {
    id?: true
    contestantId?: true
    jurorId?: true
    categoryId?: true
    value?: true
    photoUrl?: true
    createdAt?: true
  }

  export type RatingMaxAggregateInputType = {
    id?: true
    contestantId?: true
    jurorId?: true
    categoryId?: true
    value?: true
    photoUrl?: true
    createdAt?: true
  }

  export type RatingCountAggregateInputType = {
    id?: true
    contestantId?: true
    jurorId?: true
    categoryId?: true
    value?: true
    photoUrl?: true
    createdAt?: true
    _all?: true
  }

  export type RatingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rating to aggregate.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ratings
    **/
    _count?: true | RatingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RatingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RatingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatingMaxAggregateInputType
  }

  export type GetRatingAggregateType<T extends RatingAggregateArgs> = {
        [P in keyof T & keyof AggregateRating]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRating[P]>
      : GetScalarType<T[P], AggregateRating[P]>
  }




  export type RatingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithAggregationInput | RatingOrderByWithAggregationInput[]
    by: RatingScalarFieldEnum[] | RatingScalarFieldEnum
    having?: RatingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatingCountAggregateInputType | true
    _avg?: RatingAvgAggregateInputType
    _sum?: RatingSumAggregateInputType
    _min?: RatingMinAggregateInputType
    _max?: RatingMaxAggregateInputType
  }

  export type RatingGroupByOutputType = {
    id: number
    contestantId: number
    jurorId: number
    categoryId: number
    value: number
    photoUrl: string | null
    createdAt: Date
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  type GetRatingGroupByPayload<T extends RatingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatingGroupByOutputType[P]>
            : GetScalarType<T[P], RatingGroupByOutputType[P]>
        }
      >
    >


  export type RatingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contestantId?: boolean
    jurorId?: boolean
    categoryId?: boolean
    value?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    contestant?: boolean | ContestantDefaultArgs<ExtArgs>
    juror?: boolean | JurorDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contestantId?: boolean
    jurorId?: boolean
    categoryId?: boolean
    value?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    contestant?: boolean | ContestantDefaultArgs<ExtArgs>
    juror?: boolean | JurorDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contestantId?: boolean
    jurorId?: boolean
    categoryId?: boolean
    value?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    contestant?: boolean | ContestantDefaultArgs<ExtArgs>
    juror?: boolean | JurorDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectScalar = {
    id?: boolean
    contestantId?: boolean
    jurorId?: boolean
    categoryId?: boolean
    value?: boolean
    photoUrl?: boolean
    createdAt?: boolean
  }

  export type RatingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contestantId" | "jurorId" | "categoryId" | "value" | "photoUrl" | "createdAt", ExtArgs["result"]["rating"]>
  export type RatingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contestant?: boolean | ContestantDefaultArgs<ExtArgs>
    juror?: boolean | JurorDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type RatingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contestant?: boolean | ContestantDefaultArgs<ExtArgs>
    juror?: boolean | JurorDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type RatingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contestant?: boolean | ContestantDefaultArgs<ExtArgs>
    juror?: boolean | JurorDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $RatingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rating"
    objects: {
      contestant: Prisma.$ContestantPayload<ExtArgs>
      juror: Prisma.$JurorPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      contestantId: number
      jurorId: number
      categoryId: number
      value: number
      photoUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["rating"]>
    composites: {}
  }

  type RatingGetPayload<S extends boolean | null | undefined | RatingDefaultArgs> = $Result.GetResult<Prisma.$RatingPayload, S>

  type RatingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RatingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatingCountAggregateInputType | true
    }

  export interface RatingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rating'], meta: { name: 'Rating' } }
    /**
     * Find zero or one Rating that matches the filter.
     * @param {RatingFindUniqueArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatingFindUniqueArgs>(args: SelectSubset<T, RatingFindUniqueArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rating that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RatingFindUniqueOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatingFindUniqueOrThrowArgs>(args: SelectSubset<T, RatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatingFindFirstArgs>(args?: SelectSubset<T, RatingFindFirstArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatingFindFirstOrThrowArgs>(args?: SelectSubset<T, RatingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratings
     * const ratings = await prisma.rating.findMany()
     * 
     * // Get first 10 Ratings
     * const ratings = await prisma.rating.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ratingWithIdOnly = await prisma.rating.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RatingFindManyArgs>(args?: SelectSubset<T, RatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rating.
     * @param {RatingCreateArgs} args - Arguments to create a Rating.
     * @example
     * // Create one Rating
     * const Rating = await prisma.rating.create({
     *   data: {
     *     // ... data to create a Rating
     *   }
     * })
     * 
     */
    create<T extends RatingCreateArgs>(args: SelectSubset<T, RatingCreateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ratings.
     * @param {RatingCreateManyArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatingCreateManyArgs>(args?: SelectSubset<T, RatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ratings and returns the data saved in the database.
     * @param {RatingCreateManyAndReturnArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatingCreateManyAndReturnArgs>(args?: SelectSubset<T, RatingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rating.
     * @param {RatingDeleteArgs} args - Arguments to delete one Rating.
     * @example
     * // Delete one Rating
     * const Rating = await prisma.rating.delete({
     *   where: {
     *     // ... filter to delete one Rating
     *   }
     * })
     * 
     */
    delete<T extends RatingDeleteArgs>(args: SelectSubset<T, RatingDeleteArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rating.
     * @param {RatingUpdateArgs} args - Arguments to update one Rating.
     * @example
     * // Update one Rating
     * const rating = await prisma.rating.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatingUpdateArgs>(args: SelectSubset<T, RatingUpdateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ratings.
     * @param {RatingDeleteManyArgs} args - Arguments to filter Ratings to delete.
     * @example
     * // Delete a few Ratings
     * const { count } = await prisma.rating.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatingDeleteManyArgs>(args?: SelectSubset<T, RatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatingUpdateManyArgs>(args: SelectSubset<T, RatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings and returns the data updated in the database.
     * @param {RatingUpdateManyAndReturnArgs} args - Arguments to update many Ratings.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.updateManyAndReturn({
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
    updateManyAndReturn<T extends RatingUpdateManyAndReturnArgs>(args: SelectSubset<T, RatingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rating.
     * @param {RatingUpsertArgs} args - Arguments to update or create a Rating.
     * @example
     * // Update or create a Rating
     * const rating = await prisma.rating.upsert({
     *   create: {
     *     // ... data to create a Rating
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rating we want to update
     *   }
     * })
     */
    upsert<T extends RatingUpsertArgs>(args: SelectSubset<T, RatingUpsertArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingCountArgs} args - Arguments to filter Ratings to count.
     * @example
     * // Count the number of Ratings
     * const count = await prisma.rating.count({
     *   where: {
     *     // ... the filter for the Ratings we want to count
     *   }
     * })
    **/
    count<T extends RatingCountArgs>(
      args?: Subset<T, RatingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RatingAggregateArgs>(args: Subset<T, RatingAggregateArgs>): Prisma.PrismaPromise<GetRatingAggregateType<T>>

    /**
     * Group by Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingGroupByArgs} args - Group by arguments.
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
      T extends RatingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatingGroupByArgs['orderBy'] }
        : { orderBy?: RatingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rating model
   */
  readonly fields: RatingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rating.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contestant<T extends ContestantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContestantDefaultArgs<ExtArgs>>): Prisma__ContestantClient<$Result.GetResult<Prisma.$ContestantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    juror<T extends JurorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JurorDefaultArgs<ExtArgs>>): Prisma__JurorClient<$Result.GetResult<Prisma.$JurorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Rating model
   */
  interface RatingFieldRefs {
    readonly id: FieldRef<"Rating", 'Int'>
    readonly contestantId: FieldRef<"Rating", 'Int'>
    readonly jurorId: FieldRef<"Rating", 'Int'>
    readonly categoryId: FieldRef<"Rating", 'Int'>
    readonly value: FieldRef<"Rating", 'Int'>
    readonly photoUrl: FieldRef<"Rating", 'String'>
    readonly createdAt: FieldRef<"Rating", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rating findUnique
   */
  export type RatingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findUniqueOrThrow
   */
  export type RatingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findFirst
   */
  export type RatingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findFirstOrThrow
   */
  export type RatingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findMany
   */
  export type RatingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Ratings to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating create
   */
  export type RatingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to create a Rating.
     */
    data: XOR<RatingCreateInput, RatingUncheckedCreateInput>
  }

  /**
   * Rating createMany
   */
  export type RatingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rating createManyAndReturn
   */
  export type RatingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating update
   */
  export type RatingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to update a Rating.
     */
    data: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
    /**
     * Choose, which Rating to update.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating updateMany
   */
  export type RatingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
  }

  /**
   * Rating updateManyAndReturn
   */
  export type RatingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating upsert
   */
  export type RatingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The filter to search for the Rating to update in case it exists.
     */
    where: RatingWhereUniqueInput
    /**
     * In case the Rating found by the `where` argument doesn't exist, create a new Rating with this data.
     */
    create: XOR<RatingCreateInput, RatingUncheckedCreateInput>
    /**
     * In case the Rating was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
  }

  /**
   * Rating delete
   */
  export type RatingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter which Rating to delete.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating deleteMany
   */
  export type RatingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratings to delete
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to delete.
     */
    limit?: number
  }

  /**
   * Rating without action
   */
  export type RatingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
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


  export const ContestantScalarFieldEnum: {
    id: 'id',
    pseudo: 'pseudo',
    password: 'password',
    age: 'age',
    prenom: 'prenom',
    createdAt: 'createdAt'
  };

  export type ContestantScalarFieldEnum = (typeof ContestantScalarFieldEnum)[keyof typeof ContestantScalarFieldEnum]


  export const JurorScalarFieldEnum: {
    id: 'id',
    pseudo: 'pseudo',
    email: 'email',
    type: 'type',
    coeff: 'coeff',
    validated: 'validated',
    validationsCount: 'validationsCount',
    createdAt: 'createdAt'
  };

  export type JurorScalarFieldEnum = (typeof JurorScalarFieldEnum)[keyof typeof JurorScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const RatingScalarFieldEnum: {
    id: 'id',
    contestantId: 'contestantId',
    jurorId: 'jurorId',
    categoryId: 'categoryId',
    value: 'value',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt'
  };

  export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type ContestantWhereInput = {
    AND?: ContestantWhereInput | ContestantWhereInput[]
    OR?: ContestantWhereInput[]
    NOT?: ContestantWhereInput | ContestantWhereInput[]
    id?: IntFilter<"Contestant"> | number
    pseudo?: StringFilter<"Contestant"> | string
    password?: StringFilter<"Contestant"> | string
    age?: IntFilter<"Contestant"> | number
    prenom?: StringFilter<"Contestant"> | string
    createdAt?: DateTimeFilter<"Contestant"> | Date | string
    ratings?: RatingListRelationFilter
  }

  export type ContestantOrderByWithRelationInput = {
    id?: SortOrder
    pseudo?: SortOrder
    password?: SortOrder
    age?: SortOrder
    prenom?: SortOrder
    createdAt?: SortOrder
    ratings?: RatingOrderByRelationAggregateInput
  }

  export type ContestantWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pseudo?: string
    AND?: ContestantWhereInput | ContestantWhereInput[]
    OR?: ContestantWhereInput[]
    NOT?: ContestantWhereInput | ContestantWhereInput[]
    password?: StringFilter<"Contestant"> | string
    age?: IntFilter<"Contestant"> | number
    prenom?: StringFilter<"Contestant"> | string
    createdAt?: DateTimeFilter<"Contestant"> | Date | string
    ratings?: RatingListRelationFilter
  }, "id" | "pseudo">

  export type ContestantOrderByWithAggregationInput = {
    id?: SortOrder
    pseudo?: SortOrder
    password?: SortOrder
    age?: SortOrder
    prenom?: SortOrder
    createdAt?: SortOrder
    _count?: ContestantCountOrderByAggregateInput
    _avg?: ContestantAvgOrderByAggregateInput
    _max?: ContestantMaxOrderByAggregateInput
    _min?: ContestantMinOrderByAggregateInput
    _sum?: ContestantSumOrderByAggregateInput
  }

  export type ContestantScalarWhereWithAggregatesInput = {
    AND?: ContestantScalarWhereWithAggregatesInput | ContestantScalarWhereWithAggregatesInput[]
    OR?: ContestantScalarWhereWithAggregatesInput[]
    NOT?: ContestantScalarWhereWithAggregatesInput | ContestantScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Contestant"> | number
    pseudo?: StringWithAggregatesFilter<"Contestant"> | string
    password?: StringWithAggregatesFilter<"Contestant"> | string
    age?: IntWithAggregatesFilter<"Contestant"> | number
    prenom?: StringWithAggregatesFilter<"Contestant"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contestant"> | Date | string
  }

  export type JurorWhereInput = {
    AND?: JurorWhereInput | JurorWhereInput[]
    OR?: JurorWhereInput[]
    NOT?: JurorWhereInput | JurorWhereInput[]
    id?: IntFilter<"Juror"> | number
    pseudo?: StringFilter<"Juror"> | string
    email?: StringFilter<"Juror"> | string
    type?: StringFilter<"Juror"> | string
    coeff?: IntFilter<"Juror"> | number
    validated?: BoolFilter<"Juror"> | boolean
    validationsCount?: IntFilter<"Juror"> | number
    createdAt?: DateTimeFilter<"Juror"> | Date | string
    ratings?: RatingListRelationFilter
  }

  export type JurorOrderByWithRelationInput = {
    id?: SortOrder
    pseudo?: SortOrder
    email?: SortOrder
    type?: SortOrder
    coeff?: SortOrder
    validated?: SortOrder
    validationsCount?: SortOrder
    createdAt?: SortOrder
    ratings?: RatingOrderByRelationAggregateInput
  }

  export type JurorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pseudo?: string
    AND?: JurorWhereInput | JurorWhereInput[]
    OR?: JurorWhereInput[]
    NOT?: JurorWhereInput | JurorWhereInput[]
    email?: StringFilter<"Juror"> | string
    type?: StringFilter<"Juror"> | string
    coeff?: IntFilter<"Juror"> | number
    validated?: BoolFilter<"Juror"> | boolean
    validationsCount?: IntFilter<"Juror"> | number
    createdAt?: DateTimeFilter<"Juror"> | Date | string
    ratings?: RatingListRelationFilter
  }, "id" | "pseudo">

  export type JurorOrderByWithAggregationInput = {
    id?: SortOrder
    pseudo?: SortOrder
    email?: SortOrder
    type?: SortOrder
    coeff?: SortOrder
    validated?: SortOrder
    validationsCount?: SortOrder
    createdAt?: SortOrder
    _count?: JurorCountOrderByAggregateInput
    _avg?: JurorAvgOrderByAggregateInput
    _max?: JurorMaxOrderByAggregateInput
    _min?: JurorMinOrderByAggregateInput
    _sum?: JurorSumOrderByAggregateInput
  }

  export type JurorScalarWhereWithAggregatesInput = {
    AND?: JurorScalarWhereWithAggregatesInput | JurorScalarWhereWithAggregatesInput[]
    OR?: JurorScalarWhereWithAggregatesInput[]
    NOT?: JurorScalarWhereWithAggregatesInput | JurorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Juror"> | number
    pseudo?: StringWithAggregatesFilter<"Juror"> | string
    email?: StringWithAggregatesFilter<"Juror"> | string
    type?: StringWithAggregatesFilter<"Juror"> | string
    coeff?: IntWithAggregatesFilter<"Juror"> | number
    validated?: BoolWithAggregatesFilter<"Juror"> | boolean
    validationsCount?: IntWithAggregatesFilter<"Juror"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Juror"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    ratings?: RatingListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ratings?: RatingOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    ratings?: RatingListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
  }

  export type RatingWhereInput = {
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    id?: IntFilter<"Rating"> | number
    contestantId?: IntFilter<"Rating"> | number
    jurorId?: IntFilter<"Rating"> | number
    categoryId?: IntFilter<"Rating"> | number
    value?: IntFilter<"Rating"> | number
    photoUrl?: StringNullableFilter<"Rating"> | string | null
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    contestant?: XOR<ContestantScalarRelationFilter, ContestantWhereInput>
    juror?: XOR<JurorScalarRelationFilter, JurorWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type RatingOrderByWithRelationInput = {
    id?: SortOrder
    contestantId?: SortOrder
    jurorId?: SortOrder
    categoryId?: SortOrder
    value?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    contestant?: ContestantOrderByWithRelationInput
    juror?: JurorOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type RatingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    contestantId_jurorId_categoryId?: RatingContestantIdJurorIdCategoryIdCompoundUniqueInput
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    contestantId?: IntFilter<"Rating"> | number
    jurorId?: IntFilter<"Rating"> | number
    categoryId?: IntFilter<"Rating"> | number
    value?: IntFilter<"Rating"> | number
    photoUrl?: StringNullableFilter<"Rating"> | string | null
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    contestant?: XOR<ContestantScalarRelationFilter, ContestantWhereInput>
    juror?: XOR<JurorScalarRelationFilter, JurorWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id" | "contestantId_jurorId_categoryId">

  export type RatingOrderByWithAggregationInput = {
    id?: SortOrder
    contestantId?: SortOrder
    jurorId?: SortOrder
    categoryId?: SortOrder
    value?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RatingCountOrderByAggregateInput
    _avg?: RatingAvgOrderByAggregateInput
    _max?: RatingMaxOrderByAggregateInput
    _min?: RatingMinOrderByAggregateInput
    _sum?: RatingSumOrderByAggregateInput
  }

  export type RatingScalarWhereWithAggregatesInput = {
    AND?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    OR?: RatingScalarWhereWithAggregatesInput[]
    NOT?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Rating"> | number
    contestantId?: IntWithAggregatesFilter<"Rating"> | number
    jurorId?: IntWithAggregatesFilter<"Rating"> | number
    categoryId?: IntWithAggregatesFilter<"Rating"> | number
    value?: IntWithAggregatesFilter<"Rating"> | number
    photoUrl?: StringNullableWithAggregatesFilter<"Rating"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
  }

  export type ContestantCreateInput = {
    pseudo: string
    password?: string
    age: number
    prenom: string
    createdAt?: Date | string
    ratings?: RatingCreateNestedManyWithoutContestantInput
  }

  export type ContestantUncheckedCreateInput = {
    id?: number
    pseudo: string
    password?: string
    age: number
    prenom: string
    createdAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutContestantInput
  }

  export type ContestantUpdateInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    prenom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUpdateManyWithoutContestantNestedInput
  }

  export type ContestantUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    prenom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutContestantNestedInput
  }

  export type ContestantCreateManyInput = {
    id?: number
    pseudo: string
    password?: string
    age: number
    prenom: string
    createdAt?: Date | string
  }

  export type ContestantUpdateManyMutationInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    prenom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestantUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    prenom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurorCreateInput = {
    pseudo: string
    email?: string
    type: string
    coeff?: number
    validated?: boolean
    validationsCount?: number
    createdAt?: Date | string
    ratings?: RatingCreateNestedManyWithoutJurorInput
  }

  export type JurorUncheckedCreateInput = {
    id?: number
    pseudo: string
    email?: string
    type: string
    coeff?: number
    validated?: boolean
    validationsCount?: number
    createdAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutJurorInput
  }

  export type JurorUpdateInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    coeff?: IntFieldUpdateOperationsInput | number
    validated?: BoolFieldUpdateOperationsInput | boolean
    validationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUpdateManyWithoutJurorNestedInput
  }

  export type JurorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    coeff?: IntFieldUpdateOperationsInput | number
    validated?: BoolFieldUpdateOperationsInput | boolean
    validationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutJurorNestedInput
  }

  export type JurorCreateManyInput = {
    id?: number
    pseudo: string
    email?: string
    type: string
    coeff?: number
    validated?: boolean
    validationsCount?: number
    createdAt?: Date | string
  }

  export type JurorUpdateManyMutationInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    coeff?: IntFieldUpdateOperationsInput | number
    validated?: BoolFieldUpdateOperationsInput | boolean
    validationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    coeff?: IntFieldUpdateOperationsInput | number
    validated?: BoolFieldUpdateOperationsInput | boolean
    validationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    ratings?: RatingCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    ratings?: RatingUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    ratings?: RatingUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ratings?: RatingUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RatingCreateInput = {
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
    contestant: ContestantCreateNestedOneWithoutRatingsInput
    juror: JurorCreateNestedOneWithoutRatingsInput
    category: CategoryCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateInput = {
    id?: number
    contestantId: number
    jurorId: number
    categoryId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingUpdateInput = {
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contestant?: ContestantUpdateOneRequiredWithoutRatingsNestedInput
    juror?: JurorUpdateOneRequiredWithoutRatingsNestedInput
    category?: CategoryUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    contestantId?: IntFieldUpdateOperationsInput | number
    jurorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyInput = {
    id?: number
    contestantId: number
    jurorId: number
    categoryId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingUpdateManyMutationInput = {
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    contestantId?: IntFieldUpdateOperationsInput | number
    jurorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type RatingListRelationFilter = {
    every?: RatingWhereInput
    some?: RatingWhereInput
    none?: RatingWhereInput
  }

  export type RatingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContestantCountOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    password?: SortOrder
    age?: SortOrder
    prenom?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestantAvgOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
  }

  export type ContestantMaxOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    password?: SortOrder
    age?: SortOrder
    prenom?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestantMinOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    password?: SortOrder
    age?: SortOrder
    prenom?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestantSumOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type JurorCountOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    email?: SortOrder
    type?: SortOrder
    coeff?: SortOrder
    validated?: SortOrder
    validationsCount?: SortOrder
    createdAt?: SortOrder
  }

  export type JurorAvgOrderByAggregateInput = {
    id?: SortOrder
    coeff?: SortOrder
    validationsCount?: SortOrder
  }

  export type JurorMaxOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    email?: SortOrder
    type?: SortOrder
    coeff?: SortOrder
    validated?: SortOrder
    validationsCount?: SortOrder
    createdAt?: SortOrder
  }

  export type JurorMinOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    email?: SortOrder
    type?: SortOrder
    coeff?: SortOrder
    validated?: SortOrder
    validationsCount?: SortOrder
    createdAt?: SortOrder
  }

  export type JurorSumOrderByAggregateInput = {
    id?: SortOrder
    coeff?: SortOrder
    validationsCount?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
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

  export type ContestantScalarRelationFilter = {
    is?: ContestantWhereInput
    isNot?: ContestantWhereInput
  }

  export type JurorScalarRelationFilter = {
    is?: JurorWhereInput
    isNot?: JurorWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RatingContestantIdJurorIdCategoryIdCompoundUniqueInput = {
    contestantId: number
    jurorId: number
    categoryId: number
  }

  export type RatingCountOrderByAggregateInput = {
    id?: SortOrder
    contestantId?: SortOrder
    jurorId?: SortOrder
    categoryId?: SortOrder
    value?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type RatingAvgOrderByAggregateInput = {
    id?: SortOrder
    contestantId?: SortOrder
    jurorId?: SortOrder
    categoryId?: SortOrder
    value?: SortOrder
  }

  export type RatingMaxOrderByAggregateInput = {
    id?: SortOrder
    contestantId?: SortOrder
    jurorId?: SortOrder
    categoryId?: SortOrder
    value?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type RatingMinOrderByAggregateInput = {
    id?: SortOrder
    contestantId?: SortOrder
    jurorId?: SortOrder
    categoryId?: SortOrder
    value?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type RatingSumOrderByAggregateInput = {
    id?: SortOrder
    contestantId?: SortOrder
    jurorId?: SortOrder
    categoryId?: SortOrder
    value?: SortOrder
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

  export type RatingCreateNestedManyWithoutContestantInput = {
    create?: XOR<RatingCreateWithoutContestantInput, RatingUncheckedCreateWithoutContestantInput> | RatingCreateWithoutContestantInput[] | RatingUncheckedCreateWithoutContestantInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutContestantInput | RatingCreateOrConnectWithoutContestantInput[]
    createMany?: RatingCreateManyContestantInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutContestantInput = {
    create?: XOR<RatingCreateWithoutContestantInput, RatingUncheckedCreateWithoutContestantInput> | RatingCreateWithoutContestantInput[] | RatingUncheckedCreateWithoutContestantInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutContestantInput | RatingCreateOrConnectWithoutContestantInput[]
    createMany?: RatingCreateManyContestantInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RatingUpdateManyWithoutContestantNestedInput = {
    create?: XOR<RatingCreateWithoutContestantInput, RatingUncheckedCreateWithoutContestantInput> | RatingCreateWithoutContestantInput[] | RatingUncheckedCreateWithoutContestantInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutContestantInput | RatingCreateOrConnectWithoutContestantInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutContestantInput | RatingUpsertWithWhereUniqueWithoutContestantInput[]
    createMany?: RatingCreateManyContestantInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutContestantInput | RatingUpdateWithWhereUniqueWithoutContestantInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutContestantInput | RatingUpdateManyWithWhereWithoutContestantInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutContestantNestedInput = {
    create?: XOR<RatingCreateWithoutContestantInput, RatingUncheckedCreateWithoutContestantInput> | RatingCreateWithoutContestantInput[] | RatingUncheckedCreateWithoutContestantInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutContestantInput | RatingCreateOrConnectWithoutContestantInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutContestantInput | RatingUpsertWithWhereUniqueWithoutContestantInput[]
    createMany?: RatingCreateManyContestantInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutContestantInput | RatingUpdateWithWhereUniqueWithoutContestantInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutContestantInput | RatingUpdateManyWithWhereWithoutContestantInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type RatingCreateNestedManyWithoutJurorInput = {
    create?: XOR<RatingCreateWithoutJurorInput, RatingUncheckedCreateWithoutJurorInput> | RatingCreateWithoutJurorInput[] | RatingUncheckedCreateWithoutJurorInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJurorInput | RatingCreateOrConnectWithoutJurorInput[]
    createMany?: RatingCreateManyJurorInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutJurorInput = {
    create?: XOR<RatingCreateWithoutJurorInput, RatingUncheckedCreateWithoutJurorInput> | RatingCreateWithoutJurorInput[] | RatingUncheckedCreateWithoutJurorInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJurorInput | RatingCreateOrConnectWithoutJurorInput[]
    createMany?: RatingCreateManyJurorInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RatingUpdateManyWithoutJurorNestedInput = {
    create?: XOR<RatingCreateWithoutJurorInput, RatingUncheckedCreateWithoutJurorInput> | RatingCreateWithoutJurorInput[] | RatingUncheckedCreateWithoutJurorInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJurorInput | RatingCreateOrConnectWithoutJurorInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutJurorInput | RatingUpsertWithWhereUniqueWithoutJurorInput[]
    createMany?: RatingCreateManyJurorInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutJurorInput | RatingUpdateWithWhereUniqueWithoutJurorInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutJurorInput | RatingUpdateManyWithWhereWithoutJurorInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutJurorNestedInput = {
    create?: XOR<RatingCreateWithoutJurorInput, RatingUncheckedCreateWithoutJurorInput> | RatingCreateWithoutJurorInput[] | RatingUncheckedCreateWithoutJurorInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJurorInput | RatingCreateOrConnectWithoutJurorInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutJurorInput | RatingUpsertWithWhereUniqueWithoutJurorInput[]
    createMany?: RatingCreateManyJurorInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutJurorInput | RatingUpdateWithWhereUniqueWithoutJurorInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutJurorInput | RatingUpdateManyWithWhereWithoutJurorInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type RatingCreateNestedManyWithoutCategoryInput = {
    create?: XOR<RatingCreateWithoutCategoryInput, RatingUncheckedCreateWithoutCategoryInput> | RatingCreateWithoutCategoryInput[] | RatingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutCategoryInput | RatingCreateOrConnectWithoutCategoryInput[]
    createMany?: RatingCreateManyCategoryInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<RatingCreateWithoutCategoryInput, RatingUncheckedCreateWithoutCategoryInput> | RatingCreateWithoutCategoryInput[] | RatingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutCategoryInput | RatingCreateOrConnectWithoutCategoryInput[]
    createMany?: RatingCreateManyCategoryInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type RatingUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<RatingCreateWithoutCategoryInput, RatingUncheckedCreateWithoutCategoryInput> | RatingCreateWithoutCategoryInput[] | RatingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutCategoryInput | RatingCreateOrConnectWithoutCategoryInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutCategoryInput | RatingUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: RatingCreateManyCategoryInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutCategoryInput | RatingUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutCategoryInput | RatingUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<RatingCreateWithoutCategoryInput, RatingUncheckedCreateWithoutCategoryInput> | RatingCreateWithoutCategoryInput[] | RatingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutCategoryInput | RatingCreateOrConnectWithoutCategoryInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutCategoryInput | RatingUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: RatingCreateManyCategoryInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutCategoryInput | RatingUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutCategoryInput | RatingUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type ContestantCreateNestedOneWithoutRatingsInput = {
    create?: XOR<ContestantCreateWithoutRatingsInput, ContestantUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: ContestantCreateOrConnectWithoutRatingsInput
    connect?: ContestantWhereUniqueInput
  }

  export type JurorCreateNestedOneWithoutRatingsInput = {
    create?: XOR<JurorCreateWithoutRatingsInput, JurorUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: JurorCreateOrConnectWithoutRatingsInput
    connect?: JurorWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutRatingsInput = {
    create?: XOR<CategoryCreateWithoutRatingsInput, CategoryUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRatingsInput
    connect?: CategoryWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ContestantUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<ContestantCreateWithoutRatingsInput, ContestantUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: ContestantCreateOrConnectWithoutRatingsInput
    upsert?: ContestantUpsertWithoutRatingsInput
    connect?: ContestantWhereUniqueInput
    update?: XOR<XOR<ContestantUpdateToOneWithWhereWithoutRatingsInput, ContestantUpdateWithoutRatingsInput>, ContestantUncheckedUpdateWithoutRatingsInput>
  }

  export type JurorUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<JurorCreateWithoutRatingsInput, JurorUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: JurorCreateOrConnectWithoutRatingsInput
    upsert?: JurorUpsertWithoutRatingsInput
    connect?: JurorWhereUniqueInput
    update?: XOR<XOR<JurorUpdateToOneWithWhereWithoutRatingsInput, JurorUpdateWithoutRatingsInput>, JurorUncheckedUpdateWithoutRatingsInput>
  }

  export type CategoryUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<CategoryCreateWithoutRatingsInput, CategoryUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRatingsInput
    upsert?: CategoryUpsertWithoutRatingsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutRatingsInput, CategoryUpdateWithoutRatingsInput>, CategoryUncheckedUpdateWithoutRatingsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type RatingCreateWithoutContestantInput = {
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
    juror: JurorCreateNestedOneWithoutRatingsInput
    category: CategoryCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutContestantInput = {
    id?: number
    jurorId: number
    categoryId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutContestantInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutContestantInput, RatingUncheckedCreateWithoutContestantInput>
  }

  export type RatingCreateManyContestantInputEnvelope = {
    data: RatingCreateManyContestantInput | RatingCreateManyContestantInput[]
    skipDuplicates?: boolean
  }

  export type RatingUpsertWithWhereUniqueWithoutContestantInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutContestantInput, RatingUncheckedUpdateWithoutContestantInput>
    create: XOR<RatingCreateWithoutContestantInput, RatingUncheckedCreateWithoutContestantInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutContestantInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutContestantInput, RatingUncheckedUpdateWithoutContestantInput>
  }

  export type RatingUpdateManyWithWhereWithoutContestantInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutContestantInput>
  }

  export type RatingScalarWhereInput = {
    AND?: RatingScalarWhereInput | RatingScalarWhereInput[]
    OR?: RatingScalarWhereInput[]
    NOT?: RatingScalarWhereInput | RatingScalarWhereInput[]
    id?: IntFilter<"Rating"> | number
    contestantId?: IntFilter<"Rating"> | number
    jurorId?: IntFilter<"Rating"> | number
    categoryId?: IntFilter<"Rating"> | number
    value?: IntFilter<"Rating"> | number
    photoUrl?: StringNullableFilter<"Rating"> | string | null
    createdAt?: DateTimeFilter<"Rating"> | Date | string
  }

  export type RatingCreateWithoutJurorInput = {
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
    contestant: ContestantCreateNestedOneWithoutRatingsInput
    category: CategoryCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutJurorInput = {
    id?: number
    contestantId: number
    categoryId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutJurorInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutJurorInput, RatingUncheckedCreateWithoutJurorInput>
  }

  export type RatingCreateManyJurorInputEnvelope = {
    data: RatingCreateManyJurorInput | RatingCreateManyJurorInput[]
    skipDuplicates?: boolean
  }

  export type RatingUpsertWithWhereUniqueWithoutJurorInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutJurorInput, RatingUncheckedUpdateWithoutJurorInput>
    create: XOR<RatingCreateWithoutJurorInput, RatingUncheckedCreateWithoutJurorInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutJurorInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutJurorInput, RatingUncheckedUpdateWithoutJurorInput>
  }

  export type RatingUpdateManyWithWhereWithoutJurorInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutJurorInput>
  }

  export type RatingCreateWithoutCategoryInput = {
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
    contestant: ContestantCreateNestedOneWithoutRatingsInput
    juror: JurorCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutCategoryInput = {
    id?: number
    contestantId: number
    jurorId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutCategoryInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutCategoryInput, RatingUncheckedCreateWithoutCategoryInput>
  }

  export type RatingCreateManyCategoryInputEnvelope = {
    data: RatingCreateManyCategoryInput | RatingCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type RatingUpsertWithWhereUniqueWithoutCategoryInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutCategoryInput, RatingUncheckedUpdateWithoutCategoryInput>
    create: XOR<RatingCreateWithoutCategoryInput, RatingUncheckedCreateWithoutCategoryInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutCategoryInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutCategoryInput, RatingUncheckedUpdateWithoutCategoryInput>
  }

  export type RatingUpdateManyWithWhereWithoutCategoryInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ContestantCreateWithoutRatingsInput = {
    pseudo: string
    password?: string
    age: number
    prenom: string
    createdAt?: Date | string
  }

  export type ContestantUncheckedCreateWithoutRatingsInput = {
    id?: number
    pseudo: string
    password?: string
    age: number
    prenom: string
    createdAt?: Date | string
  }

  export type ContestantCreateOrConnectWithoutRatingsInput = {
    where: ContestantWhereUniqueInput
    create: XOR<ContestantCreateWithoutRatingsInput, ContestantUncheckedCreateWithoutRatingsInput>
  }

  export type JurorCreateWithoutRatingsInput = {
    pseudo: string
    email?: string
    type: string
    coeff?: number
    validated?: boolean
    validationsCount?: number
    createdAt?: Date | string
  }

  export type JurorUncheckedCreateWithoutRatingsInput = {
    id?: number
    pseudo: string
    email?: string
    type: string
    coeff?: number
    validated?: boolean
    validationsCount?: number
    createdAt?: Date | string
  }

  export type JurorCreateOrConnectWithoutRatingsInput = {
    where: JurorWhereUniqueInput
    create: XOR<JurorCreateWithoutRatingsInput, JurorUncheckedCreateWithoutRatingsInput>
  }

  export type CategoryCreateWithoutRatingsInput = {
    name: string
  }

  export type CategoryUncheckedCreateWithoutRatingsInput = {
    id?: number
    name: string
  }

  export type CategoryCreateOrConnectWithoutRatingsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutRatingsInput, CategoryUncheckedCreateWithoutRatingsInput>
  }

  export type ContestantUpsertWithoutRatingsInput = {
    update: XOR<ContestantUpdateWithoutRatingsInput, ContestantUncheckedUpdateWithoutRatingsInput>
    create: XOR<ContestantCreateWithoutRatingsInput, ContestantUncheckedCreateWithoutRatingsInput>
    where?: ContestantWhereInput
  }

  export type ContestantUpdateToOneWithWhereWithoutRatingsInput = {
    where?: ContestantWhereInput
    data: XOR<ContestantUpdateWithoutRatingsInput, ContestantUncheckedUpdateWithoutRatingsInput>
  }

  export type ContestantUpdateWithoutRatingsInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    prenom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestantUncheckedUpdateWithoutRatingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    prenom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurorUpsertWithoutRatingsInput = {
    update: XOR<JurorUpdateWithoutRatingsInput, JurorUncheckedUpdateWithoutRatingsInput>
    create: XOR<JurorCreateWithoutRatingsInput, JurorUncheckedCreateWithoutRatingsInput>
    where?: JurorWhereInput
  }

  export type JurorUpdateToOneWithWhereWithoutRatingsInput = {
    where?: JurorWhereInput
    data: XOR<JurorUpdateWithoutRatingsInput, JurorUncheckedUpdateWithoutRatingsInput>
  }

  export type JurorUpdateWithoutRatingsInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    coeff?: IntFieldUpdateOperationsInput | number
    validated?: BoolFieldUpdateOperationsInput | boolean
    validationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurorUncheckedUpdateWithoutRatingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    coeff?: IntFieldUpdateOperationsInput | number
    validated?: BoolFieldUpdateOperationsInput | boolean
    validationsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpsertWithoutRatingsInput = {
    update: XOR<CategoryUpdateWithoutRatingsInput, CategoryUncheckedUpdateWithoutRatingsInput>
    create: XOR<CategoryCreateWithoutRatingsInput, CategoryUncheckedCreateWithoutRatingsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutRatingsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutRatingsInput, CategoryUncheckedUpdateWithoutRatingsInput>
  }

  export type CategoryUpdateWithoutRatingsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutRatingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RatingCreateManyContestantInput = {
    id?: number
    jurorId: number
    categoryId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingUpdateWithoutContestantInput = {
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    juror?: JurorUpdateOneRequiredWithoutRatingsNestedInput
    category?: CategoryUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutContestantInput = {
    id?: IntFieldUpdateOperationsInput | number
    jurorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutContestantInput = {
    id?: IntFieldUpdateOperationsInput | number
    jurorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyJurorInput = {
    id?: number
    contestantId: number
    categoryId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingUpdateWithoutJurorInput = {
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contestant?: ContestantUpdateOneRequiredWithoutRatingsNestedInput
    category?: CategoryUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutJurorInput = {
    id?: IntFieldUpdateOperationsInput | number
    contestantId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutJurorInput = {
    id?: IntFieldUpdateOperationsInput | number
    contestantId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyCategoryInput = {
    id?: number
    contestantId: number
    jurorId: number
    value: number
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type RatingUpdateWithoutCategoryInput = {
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contestant?: ContestantUpdateOneRequiredWithoutRatingsNestedInput
    juror?: JurorUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    contestantId?: IntFieldUpdateOperationsInput | number
    jurorId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    contestantId?: IntFieldUpdateOperationsInput | number
    jurorId?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
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