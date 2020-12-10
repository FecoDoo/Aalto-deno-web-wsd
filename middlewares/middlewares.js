const errorMiddleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

const checkLoginStatus = async ({ session, request, response }, next) => {
  // console.log(`\nRequest url: ${request.url}`);
  // console.log(`Request method: ${request.method}`);
  // console.log(`Request time: ${Date.now()}`);
  if (
    !request.url.pathname.startsWith("/auth") &&
    !request.url.pathname.startsWith("/api") &&
    !request.url.pathname.startsWith("/")
  ) {
    if (session && (await session.get("authenticated"))) {
      // console.log(`User id: ${await session.get("user").id}`);
      await next();
    } else {
      response.status = 401;
      response.redirect("/auth/login");
    }
  } else {
    // console.log("User id: anonymous");
    await next();
  }
};

// const log = async ({ request }, next) => {
//   console.log(`${request.url.pathname} - ${request.method}`);
//   await next();
// };

// const checkCount = async ({ session }, next) => {
//   let count = await session.get("count");

//   if (!count) {
//     count = 1;
//     await session.set("count", count);
//   } else {
//     if (count > 2) {
//       render("over-used.ejs");
//     } else {
//       await session.set("count", count + 1);
//     }
//   }

//   await next();
// };

const requestTimingMiddleware = async ({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
};

const serveStaticFilesMiddleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/static")) {
    const path = context.request.url.pathname.substring(7);

    await send(context, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};

export {
  errorMiddleware,
  checkLoginStatus,
  // requestTimingMiddleware,
  serveStaticFilesMiddleware,
  // checkCount,
};
