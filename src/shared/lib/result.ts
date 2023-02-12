type TOk<Ok> = {
  type: "ok";
  data: Ok;
};

type TErr<Err> = {
  type: "err";
  data: Err;
};

export type Result<Err, Ok> = TErr<Err> | TOk<Ok>;

export const Ok = <Ok>(ok: Ok): TOk<Ok> => ({
  type: "ok",
  data: ok,
});

export const Err = <Err>(err: Err): TErr<Err> => ({
  type: "err",
  data: err,
});
