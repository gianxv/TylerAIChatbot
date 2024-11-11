import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('41a80057-2e4e-471f-a9ff-afc3cec2d0b3', '1Ruby30@hotmail.com', 'Hiker Adventurer', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv345mno', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('4da8c9d1-a2b2-4065-8aea-235e1ea6c628', '10Ivah17@yahoo.com', 'Aloha Spirit', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv789ghi', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('ca201b04-9b52-4b50-ae97-72894ab660ff', '19Serena_Keeling53@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=21', 'inv456def', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('79e1b329-45f8-488a-a0aa-4078fda7b148', '37Terrell_Bode60@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv345mno', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('c8125021-e559-4280-a73f-3939ad884ca3', '46Robyn68@gmail.com', 'Hiker Adventurer', 'https://i.imgur.com/YfJQV5z.png?id=48', 'inv456def', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('222b6a18-66ff-40eb-8a9d-81b1ad38abf0', '55Alexander.Beahan98@hotmail.com', 'Surf Lover', 'https://i.imgur.com/YfJQV5z.png?id=57', 'inv456def', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('16723dc5-8e33-4cae-9119-42cfc80dfbc0', '64Jamarcus.Goodwin@gmail.com', 'Hiker Adventurer', 'https://i.imgur.com/YfJQV5z.png?id=66', 'inv123abc', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('edc0cdac-1b6c-4302-90c7-0ee7c94bb954', '73Nettie.Streich45@gmail.com', 'Surf Lover', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv123abc', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('ed78b3de-1b22-4e41-a254-f1bc8a8e3ec5', '82Gertrude_Carroll@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=84', 'inv123abc', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('104267d9-f521-4356-acbe-5671a5a03417', 'Camping Spots on the Big Island', 'Discover the top beaches in Maui for surfing snorkeling and relaxation.', true);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('66302a68-7b4a-47ab-a14c-1661de86d4c5', 'Camping Spots on the Big Island', 'Experience the diverse local cuisine and dining options available in Kauai.', true);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('7bb99611-17d5-41b9-a30e-242d4ec92a20', 'Local Cuisine and Dining in Kauai', 'Explore the most scenic hiking trails across Oahu suitable for all skill levels.', true);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('bee59c0e-507d-475e-929b-78623faf8324', 'Hiking Trails in Oahu', 'Explore the most scenic hiking trails across Oahu suitable for all skill levels.', false);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('b78e0d30-be7d-49e4-9926-d2a87b703f45', 'Hiking Trails in Oahu', 'A guide to the vibrant cultural festivals happening throughout the Hawaiian Islands.', true);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('b8ceee2e-5986-4398-aac0-0690c1c76429', 'Hiking Trails in Oahu', 'A guide to the vibrant cultural festivals happening throughout the Hawaiian Islands.', false);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('5c4e407f-297b-49a2-b8b9-d70824f2e7e8', 'Cultural Festivals in Hawaii', 'Explore the most scenic hiking trails across Oahu suitable for all skill levels.', true);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('5c5d8d51-d1b1-42c2-a018-dcddad39805a', 'Camping Spots on the Big Island', 'Find the best camping spots on the Big Island from beachside to mountain retreats.', true);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('11a19218-2eb6-48a1-8f52-9ee497435bac', 'Local Cuisine and Dining in Kauai', 'A guide to the vibrant cultural festivals happening throughout the Hawaiian Islands.', true);
INSERT INTO "Topic" ("id", "name", "description", "isPopular") VALUES ('2bf49537-5f9b-486e-b665-24fe1439a9b9', 'Cultural Festivals in Hawaii', 'Experience the diverse local cuisine and dining options available in Kauai.', false);

INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('1defe1c3-c3c8-46c8-ae83-81ad1a62efb7', 'Cultural Events in Honolulu This Month', '2023-11-23T16:53:06.230Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('fac259cb-7d89-460e-9bc1-d150ba826e0d', 'Exploring Local Cuisine in Kauai', '2024-03-25T17:33:28.511Z', '41a80057-2e4e-471f-a9ff-afc3cec2d0b3');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('07d800b1-3fc7-44d8-a823-c165b50e73dc', 'Exploring Local Cuisine in Kauai', '2025-10-20T21:17:11.534Z', '4da8c9d1-a2b2-4065-8aea-235e1ea6c628');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('cd76e547-5aab-4666-8467-c4225d7b0020', 'Best Hiking Trails on Oahu', '2024-02-23T16:10:47.286Z', '79e1b329-45f8-488a-a0aa-4078fda7b148');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('71aad2b2-c01b-4069-b288-b2dd63f4b530', 'Cultural Events in Honolulu This Month', '2024-10-08T01:38:11.850Z', '4da8c9d1-a2b2-4065-8aea-235e1ea6c628');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('f775a9e3-6839-4721-8715-6b6a5a607731', 'Top 5 Beaches to Visit in Maui', '2024-05-02T20:55:52.525Z', '4da8c9d1-a2b2-4065-8aea-235e1ea6c628');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('6f4ada07-f42a-4513-a86c-d28ba20a8c2b', 'Best Hiking Trails on Oahu', '2025-05-06T09:10:59.111Z', '222b6a18-66ff-40eb-8a9d-81b1ad38abf0');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('c9ac29d0-3078-4be0-bf88-9b1b9f193ca5', 'Best Hiking Trails on Oahu', '2025-02-03T04:06:11.332Z', '222b6a18-66ff-40eb-8a9d-81b1ad38abf0');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('9a9913fd-fab1-4440-94cf-ea41695ecb77', 'Top 5 Beaches to Visit in Maui', '2025-05-13T00:12:10.098Z', '16723dc5-8e33-4cae-9119-42cfc80dfbc0');
INSERT INTO "Conversation" ("id", "title", "lastMessageAt", "userId") VALUES ('f6e69662-3b84-4fb5-854c-048cbbdf29ce', 'Exploring Local Cuisine in Kauai', '2024-07-26T10:06:20.771Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('c67dc2f7-645f-408a-b381-ca47e64c9e24', 'What are the best hiking trails on Oahu', false, false, '6f4ada07-f42a-4513-a86c-d28ba20a8c2b');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('884b703f-a481-493a-8630-aa1bec8d42a1', 'What are the best hiking trails on Oahu', false, false, 'c9ac29d0-3078-4be0-bf88-9b1b9f193ca5');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('113d9259-ed7e-4700-bf8f-c1b098c3a971', 'Can you recommend any local events happening in Maui this weekend', true, false, '07d800b1-3fc7-44d8-a823-c165b50e73dc');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('a2579572-5f9e-4770-bd12-491a1de028c0', 'Can you recommend any local events happening in Maui this weekend', true, false, 'c9ac29d0-3078-4be0-bf88-9b1b9f193ca5');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('9614ba63-d62c-4cc0-8702-9c9e98119b52', 'What are the best hiking trails on Oahu', true, true, 'f775a9e3-6839-4721-8715-6b6a5a607731');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('cc29bf53-3b6f-40fa-9ed1-b2403228c6a8', 'What are the mustsee tourist attractions in Kauai', false, true, 'f775a9e3-6839-4721-8715-6b6a5a607731');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('0360b674-d92d-4c26-b47b-7a4b13961c7b', 'Can you recommend any local events happening in Maui this weekend', true, false, 'f775a9e3-6839-4721-8715-6b6a5a607731');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('9ab0c029-796b-4a45-b9e3-3a004197c983', 'Can you recommend any local events happening in Maui this weekend', true, false, 'f775a9e3-6839-4721-8715-6b6a5a607731');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('0d48a6b7-1365-4761-8515-46de8632a57b', 'Is camping allowed on the Big Island and what permits do I need', true, true, '1defe1c3-c3c8-46c8-ae83-81ad1a62efb7');
INSERT INTO "Message" ("id", "content", "isFromBot", "isSaved", "conversationId") VALUES ('aab7201c-aaa3-45df-a9cb-b1eb4e323773', 'What are the mustsee tourist attractions in Kauai', false, true, '71aad2b2-c01b-4069-b288-b2dd63f4b530');

INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('f4ede55e-6776-41f1-9e21-4ccb665f2a60', 'Tourist Attractions', 'Top 5 Campsites in Maui', 'httpshawaiiinfo.comfestivalskauai', '16723dc5-8e33-4cae-9119-42cfc80dfbc0', '113d9259-ed7e-4700-bf8f-c1b098c3a971');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('ab27a31b-b574-4b28-8108-7c10c45a7102', 'Local Events', 'Upcoming Festivals in Kauai', 'httpshawaiiinfo.comattractionshonolulu', 'ca201b04-9b52-4b50-ae97-72894ab660ff', '9614ba63-d62c-4cc0-8702-9c9e98119b52');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('d724f447-7a92-4fe7-a911-40a482196fd5', 'Tourist Attractions', 'Upcoming Festivals in Kauai', 'httpshawaiiinfo.combeachesbigisland', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '0360b674-d92d-4c26-b47b-7a4b13961c7b');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('341f2944-b0ce-4449-9949-e2cfb67da9e4', 'Beaches', 'Upcoming Festivals in Kauai', 'httpshawaiiinfo.comcampingmaui', 'ed78b3de-1b22-4e41-a254-f1bc8a8e3ec5', '9ab0c029-796b-4a45-b9e3-3a004197c983');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('a88b4ee4-a637-4d87-973b-fee2eacfada8', 'Hiking', 'MustSee Attractions in Honolulu', 'httpshawaiiinfo.comfestivalskauai', '222b6a18-66ff-40eb-8a9d-81b1ad38abf0', '0360b674-d92d-4c26-b47b-7a4b13961c7b');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('45da1f34-8d59-4885-a1dc-1457af69bc33', 'Camping', 'MustSee Attractions in Honolulu', 'httpshawaiiinfo.comfestivalskauai', 'c8125021-e559-4280-a73f-3939ad884ca3', '0d48a6b7-1365-4761-8515-46de8632a57b');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('1b9d0f02-8b33-4e9e-b06d-331a8baae8f3', 'Hiking', 'Top 5 Campsites in Maui', 'httpshawaiiinfo.combeachesbigisland', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '9614ba63-d62c-4cc0-8702-9c9e98119b52');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('14634ff3-4c0b-41a2-ab3f-ef31fb30c514', 'Hiking', 'Best Hiking Trails on Oahu', 'httpshawaiiinfo.combeachesbigisland', '79e1b329-45f8-488a-a0aa-4078fda7b148', '884b703f-a481-493a-8630-aa1bec8d42a1');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('655edcdb-041e-490f-8f5d-7a31d3011e0c', 'Local Events', 'Best Hiking Trails on Oahu', 'httpshawaiiinfo.comfestivalskauai', 'ca201b04-9b52-4b50-ae97-72894ab660ff', 'aab7201c-aaa3-45df-a9cb-b1eb4e323773');
INSERT INTO "SavedItem" ("id", "category", "title", "shareLink", "userId", "messageId") VALUES ('7081f961-86df-497e-907a-720790c3bf3a', 'Beaches', 'Upcoming Festivals in Kauai', 'httpshawaiiinfo.comfestivalskauai', 'ca201b04-9b52-4b50-ae97-72894ab660ff', '0360b674-d92d-4c26-b47b-7a4b13961c7b');

INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('e236a7a8-27bd-427a-bcc1-179a6ea4d9ea', 'What are the camping regulations in Haleakal National Park', false, '66302a68-7b4a-47ab-a14c-1661de86d4c5', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('199e2621-644e-4159-949f-c0a880b10828', 'Are there any local festivals happening in Kauai this month', false, '66302a68-7b4a-47ab-a14c-1661de86d4c5', '222b6a18-66ff-40eb-8a9d-81b1ad38abf0');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('5d17e288-068d-4f29-98a3-8319d52f8feb', 'What are the mustsee attractions on the Big Island', false, '66302a68-7b4a-47ab-a14c-1661de86d4c5', 'ca201b04-9b52-4b50-ae97-72894ab660ff');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('5172f925-7d6c-4038-9f0a-fe44237b3ae1', 'What are the best hiking trails on Oahu', false, 'b8ceee2e-5986-4398-aac0-0690c1c76429', '16723dc5-8e33-4cae-9119-42cfc80dfbc0');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('421c0083-fa45-4ed0-a0e7-72cb328bb939', 'What are the best hiking trails on Oahu', false, 'bee59c0e-507d-475e-929b-78623faf8324', '222b6a18-66ff-40eb-8a9d-81b1ad38abf0');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('650721f2-e131-4f54-9450-01946c906e58', 'Where can I find authentic Hawaiian food in Maui', false, '2bf49537-5f9b-486e-b665-24fe1439a9b9', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('577915d2-3464-4e77-94ec-19dc6cce1fd1', 'What are the mustsee attractions on the Big Island', false, '66302a68-7b4a-47ab-a14c-1661de86d4c5', 'ed78b3de-1b22-4e41-a254-f1bc8a8e3ec5');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('c8e9192a-1e6e-4c39-b656-3e9c4639f275', 'What are the best hiking trails on Oahu', false, '2bf49537-5f9b-486e-b665-24fe1439a9b9', 'ca201b04-9b52-4b50-ae97-72894ab660ff');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('04345fd1-4da6-4351-bed8-dfc391d79ace', 'What are the best hiking trails on Oahu', true, '5c5d8d51-d1b1-42c2-a018-dcddad39805a', '41a80057-2e4e-471f-a9ff-afc3cec2d0b3');
INSERT INTO "TopicQuestion" ("id", "question", "isPopular", "topicId", "userId") VALUES ('04f46055-a000-40ed-b589-2ab44451bdc4', 'Where can I find authentic Hawaiian food in Maui', true, '5c5d8d51-d1b1-42c2-a018-dcddad39805a', '4da8c9d1-a2b2-4065-8aea-235e1ea6c628');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
