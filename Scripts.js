// db.posts.save({ title:"Manually created", content: "Samble content", user: "AFBN3" });
db.getCollection("posts").find({})
db.posts.find({});
db.posts.find({ user: "AFBN" });
db.posts.find({ user: { $in: ["AFBN", "AFBN 2"] }});
db.posts.aggregate(
    { $sort: { title: -1 } }
)

db.posts.aggregate(
    { $sort: { title: 1 } }
)

