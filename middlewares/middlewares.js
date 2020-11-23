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

export { errorMiddleware, log, checkCount };
