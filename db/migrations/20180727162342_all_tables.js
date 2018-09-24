
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.string("profilePic").notNullable().defaultTo("https://www.twistt.net/assets/img/profile-placeholder.png");
        table.string("email").notNullable();
        table.text("password").notNullable();
        table.text("phone_number");
        table.boolean("profile_privacy").defaultTo(true);
        table.timestamp('date_joined').defaultTo(knex.fn.now());
    })
    .createTable("posts", (table) => {
        table.increments();
        table.text("photo").notNullable().defaultTo("https://jlfarchitects.com/wp-content/uploads/2015/03/img-placeholder-300x300.jpg");
        table.text("caption").notNullable();
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("cascade");
        table.timestamp("date_created").defaultTo(knex.fn.now());
    })
    .createTable("likes", ( table) => {
        table.increments();
        table.integer("postId").unsigned().references("id").inTable("posts");
        table.integer("userId").unsigned().references("id").inTable("users");
        table.timestamp("data_liked").defaultTo(knex.fn.now());
    })
    .createTable("comments", (table) => {
        table.increments();
        table.text("comment").notNullable();
        table.integer("userId").unsigned().references("id").inTable("users");
        table.integer("postId").unsigned().references("id").inTable("posts");
    })
    .createTable("follower", (table) => {
        table.increments();
        table.integer("followerId").unsigned().references("id").inTable("users");
        table.integer("followeeId").unsigned().references("id").inTable("users")
        table.boolean("accept_request").defaultTo("false");
    })
    .createTable("saved", (table) => {
        table.increments();
        table.integer("userId").unsigned().references("id").inTable("users");
        table.integer("postId").unsigned().references("id").inTable("posts");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("saved").dropTable("comments").dropTable("likes").dropTable("posts").dropTable("follower").dropTable("users");
};
