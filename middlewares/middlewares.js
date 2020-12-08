const errorMiddleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

const log = async ({ request }, next) => {
  console.log(`${request.url.pathname} - ${request.method}`);
  await next();
};

const checkCount = async ({ session }, next) => {
  let count = await session.get("count");

  if (!count) {
    count = 1;
    await session.set("count", count);
  } else {
    if (count > 2) {
      render("over-used.ejs");
    } else {
      await session.set("count", count + 1);
    }
  }

  await next();
};


const requestTimingMiddleware = async({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

export { errorMiddleware, requestTimingMiddleware,serveStaticFilesMiddleware, checkCount };
