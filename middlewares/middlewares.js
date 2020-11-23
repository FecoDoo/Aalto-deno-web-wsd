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

export { errorMiddleware, log };
