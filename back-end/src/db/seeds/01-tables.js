exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("tables").insert([
        {
          "table_name": "Bar #1",
          "capacity": 1,
          "created_at": "2020-12-10T08:31:32.326Z",
          "updated_at": "2020-12-10T08:31:32.326Z"
        },
        {
          "table_name": "Bar #2",
          "capacity": 1,
          "created_at": "2020-12-10T08:31:32.326Z",
          "updated_at": "2020-12-10T08:31:32.326Z"
        },
        {
          "table_name": "#1",
          "capacity": 6,
          "created_at": "2020-12-10T08:31:32.326Z",
          "updated_at": "2020-12-10T08:31:32.326Z"
        },
        {
          "table_name": "#2",
          "capacity": 6,
          "created_at": "2020-12-10T08:31:32.326Z",
          "updated_at": "2020-12-10T08:31:32.326Z"
        },
      ]);
    });
};