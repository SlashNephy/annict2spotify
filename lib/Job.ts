type Awaitable<T> = T | PromiseLike<T>

type JobResult<TContext, TResult> = {
  result: TResult
  context: TContext
}

export class Job<TContext, TResult> implements PromiseLike<JobResult<TContext, TResult>> {
  private readonly context: TContext
  private readonly awaitable: Awaitable<TResult>

  private constructor(context: TContext, awaitable: Awaitable<TResult>) {
    this.context = context
    this.awaitable = awaitable
  }

  public static from<TC, TR>(context: TC, awaitable: Awaitable<TR>): Job<TC, TR> {
    return new Job(context, awaitable)
  }

  public then<TResult1 = JobResult<TContext, TResult>, TResult2 = never>(
    onFulfilled?: (value: JobResult<TContext, TResult>) => PromiseLike<TResult1> | TResult1,
    onRejected?: (reason: unknown) => PromiseLike<TResult2> | TResult2
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.resolve(this.awaitable)
      .then((result) => ({
        result,
        context: this.context,
      }))
      .then(onFulfilled, onRejected)
  }
}
