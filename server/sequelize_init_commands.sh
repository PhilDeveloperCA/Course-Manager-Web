npx sequelize model:create --name User --attributes email:string,username:string,password:string
npx sequelize model:create --name Course --attributes user_id:integer,name:string,description:string,start_date:date,end_date:date,completed:boolean
npx sequelize model:create --name Quiz --attributes course_id:integer,title:string
npx sequelize model:create --name ShortAnswer --attributes quiz_id:integer,question:string,answer:string
npx sequelize model:create --name MultipleChoice --attributes quiz_id:integer,question:string,a1:string,a2:string,a3:string,a4:string,a5:string,answer:integer
npx sequelize model:create --name CourseTopic --attributes course_id:integer,name:string,description:string
npx sequelize model:create --name TopicLink --attributes topic_id:integer,name:string,url:string
npx sequelize model:create --name Task --attributes course_id:integer,name:string,description:string
npx sequelize model:create --name TaskTopic --attributes task_id:integer,name:string,description:string
npx sequelize-cli db:migrate
#npx sequelize-cli db:migrate:undo