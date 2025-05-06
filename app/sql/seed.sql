-- seed.sql
-- Profile ID constant: 9b148da9-b1b9-4dfc-be7b-460730267cde

-- Seed categories
INSERT INTO categories (name, description, created_at, updated_at) VALUES
('Productivity', 'Tools to help you get more done in less time', NOW(), NOW()),
('Developer Tools', 'Software for developers to improve their workflow', NOW(), NOW()),
('Design', 'Tools for designers to create beautiful interfaces', NOW(), NOW()),
('Marketing', 'Tools to help you grow your business', NOW(), NOW()),
('Finance', 'Tools to help you manage your money', NOW(), NOW());

-- Seed topics
INSERT INTO topics (name, slug, created_at ) VALUES
('Launch Announcements', 'launch-announcements', NOW()),
('Feedback', 'feedback', NOW()),
('Technical Discussion', 'technical-discussion', NOW()),
('Design Discussion', 'design-discussion', NOW()),
('General', 'general', NOW());

-- Seed teams
INSERT INTO team (product_name, team_size, equity_split, product_stage, roles, product_description, created_at, updated_at) VALUES
('CodeCollab', 5, 20, 'mvp', 'Developer, Designer, Marketer', 'A collaborative code editor for remote teams', NOW(), NOW()),
('DesignVault', 3, 33, 'prototype', 'Designer, Developer', 'A tool for organizing design assets', NOW(), NOW()),
('MarketPulse', 4, 25, 'idea', 'Marketer, Developer, Designer', 'AI-powered market analysis tool', NOW(), NOW()),
('FinTrack', 2, 50, 'mvp', 'Developer, Founder', 'Personal finance tracking app', NOW(), NOW()),
('DevFlow', 6, 16, 'product', 'Developer, Designer, Product Manager', 'Developer workflow automation tool', NOW(), NOW());

-- Seed products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at) VALUES
('Taskify', 'Task management for teams', 'A comprehensive task management system for teams of all sizes', 'Create tasks, assign them to team members, and track progress', '/icons/taskify.png', 'https://taskify.app', '{"views":120,"reviews":15}', '9b148da9-b1b9-4dfc-be7b-460730267cde', 1, NOW(), NOW()),
('CodeSnippet', 'Save and share code snippets', 'A tool for saving and sharing code snippets with your team', 'Create snippets, categorize them, and share them with your team', '/icons/codesnippet.png', 'https://codesnippet.app', '{"views":85,"reviews":8}', '9b148da9-b1b9-4dfc-be7b-460730267cde', 2, NOW(), NOW()),
('DesignLib', 'Design component library', 'A library of design components for your projects', 'Browse components, customize them, and use them in your projects', '/icons/designlib.png', 'https://designlib.app', '{"views":200,"reviews":25}', '9b148da9-b1b9-4dfc-be7b-460730267cde', 3, NOW(), NOW()),
('GrowthHacker', 'Marketing automation', 'Tools to automate your marketing efforts', 'Set up campaigns, track performance, and optimize for growth', '/icons/growthhacker.png', 'https://growthhacker.app', '{"views":150,"reviews":12}', '9b148da9-b1b9-4dfc-be7b-460730267cde', 4, NOW(), NOW()),
('MoneyWise', 'Smart budgeting', 'Personal finance management made easy', 'Connect your accounts, track expenses, and set budgets', '/icons/moneywise.png', 'https://moneywise.app', '{"views":175,"reviews":20}', '9b148da9-b1b9-4dfc-be7b-460730267cde', 5, NOW(), NOW());

-- Seed product upvotes (composite primary key)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde');

-- Seed reviews
INSERT INTO reviews (product_id, profile_id, rating, review, created_at, updated_at) VALUES
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde', 5, 'Amazing productivity tool! Changed how our team collaborates.', NOW(), NOW()),
(2, '9b148da9-b1b9-4dfc-be7b-460730267cde', 4, 'Great for storing and sharing code snippets. Could use better search.', NOW(), NOW()),
(3, '9b148da9-b1b9-4dfc-be7b-460730267cde', 5, 'Extensive component library that saved us tons of time.', NOW(), NOW()),
(4, '9b148da9-b1b9-4dfc-be7b-460730267cde', 3, 'Decent marketing automation, but missing some key features.', NOW(), NOW()),
(5, '9b148da9-b1b9-4dfc-be7b-460730267cde', 4, 'Solid budgeting app. Intuitive interface and helpful insights.', NOW(), NOW());

-- Seed posts
INSERT INTO posts (title, content, topic_id, profile_id, created_at, updated_at) VALUES
('Introducing Taskify', 'We just launched Taskify, a new task management tool for teams. Check it out!', 1, '9b148da9-b1b9-4dfc-be7b-460730267cde', NOW(), NOW()),
('Looking for feedback on CodeSnippet', 'We''ve been working on CodeSnippet for a while now and would love to get your feedback.', 2, '9b148da9-b1b9-4dfc-be7b-460730267cde', NOW(), NOW()),
('How to implement auth in React apps?', 'What''s your preferred way to implement authentication in React applications?', 3, '9b148da9-b1b9-4dfc-be7b-460730267cde', NOW(), NOW()),
('Color schemes for productivity apps', 'Let''s discuss what color schemes work best for productivity applications.', 4, '9b148da9-b1b9-4dfc-be7b-460730267cde', NOW(), NOW()),
('Introducing myself to the community', 'Hi everyone! I''m new here and wanted to introduce myself.', 5, '9b148da9-b1b9-4dfc-be7b-460730267cde', NOW(), NOW());

-- Seed post upvotes
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde');


-- Seed post replies
INSERT INTO post_replies (post_id, profile_id, reply, created_at, updated_at) VALUES
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'Congrats on the launch! The app looks amazing.', NOW(), NOW()),
(2, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'I love the interface! Very intuitive.', NOW(), NOW()),
(3, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'I prefer using Auth0 for React authentication.', NOW(), NOW()),
(4, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'Blue and white are classic for productivity apps.', NOW(), NOW()),
(5, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'Welcome to the community!', NOW(), NOW());

-- Seed jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range, created_at, updated_at) VALUES
('Senior React Developer', 'Looking for a senior React developer to join our team.', 'Build and maintain React applications', 'At least 5 years of experience with React', 'Health insurance, 401k, remote work', 'React, TypeScript, Redux', 'TechCorp', '/logos/techcorp.png', 'San Francisco, CA', 'https://techcorp.com/careers', 'full-time', 'remote', '$100000-$150000', NOW(), NOW()),
('Product Designer', 'Seeking a product designer to help shape our user experience.', 'Design user interfaces and experiences', 'Experience with Figma and design systems', 'Health insurance, unlimited PTO', 'Figma, UI/UX, Design Systems', 'DesignInc', '/logos/designinc.png', 'New York, NY', 'https://designinc.com/careers', 'full-time', 'hybrid', '$100000-$150000', NOW(), NOW()),
('Marketing Specialist', 'Join our marketing team to help grow our product.', 'Create and execute marketing campaigns', 'Experience with digital marketing', 'Health insurance, stock options', 'SEO, Content Marketing, Social Media', 'GrowthHQ', '/logos/growthhq.png', 'Austin, TX', 'https://growthhq.com/careers', 'part-time', 'on-site', '$50000-$100000', NOW(), NOW()),
('Frontend Developer', 'Looking for a frontend developer to build beautiful UIs.', 'Build responsive web applications', 'Experience with modern JavaScript frameworks', 'Remote work, flexible hours', 'JavaScript, CSS, HTML, React', 'WebWorks', '/logos/webworks.png', 'Remote', 'https://webworks.com/careers', 'contract', 'remote', '$50000-$100000', NOW(), NOW()),
('Full Stack Developer', 'Join our team to build the next generation of web apps.', 'Develop both frontend and backend systems', 'Experience with full stack development', 'Competitive salary, great team', 'JavaScript, Node.js, React, MongoDB', 'StackLabs', '/logos/stacklabs.png', 'Seattle, WA', 'https://stacklabs.com/careers', 'full-time', 'hybrid', '$150000-$200000', NOW(), NOW());

-- Seed gpt ideas
INSERT INTO gpt_ideas (idea, views, claimed_at, claimed_by) VALUES
('A tool for tracking daily habits and sending reminders', 50, NOW(), NULL),
('An AI assistant for code reviews that suggests improvements', 75, NOW(), NULL),
('A design tool that generates color palettes based on mood', 100, NOW(), NULL),
('A marketing analytics dashboard that predicts campaign performance', 65, NOW(), NULL),
('A personal finance app that recommends investments based on goals', 85, NOW(), NULL);

-- Seed gpt idea likes (composite primary key)
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde');

-- Seed message rooms
INSERT INTO message_rooms DEFAULT VALUES;
INSERT INTO message_rooms DEFAULT VALUES;
INSERT INTO message_rooms DEFAULT VALUES;
INSERT INTO message_rooms DEFAULT VALUES;
INSERT INTO message_rooms DEFAULT VALUES;

-- Seed message room members (composite primary key)
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde');

-- Seed messages
INSERT INTO messages (message_room_id, sender_id, content, seen) VALUES
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'Hello, I''m interested in your product!', true),
(1, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'Can you tell me more about the pricing?', false),
(2, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'I have a question about the API documentation.', true),
(3, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'When will the new features be released?', false),
(4, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'Thanks for your help!', true);

-- Seed notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type, created_at) VALUES
('9b148da9-b1b9-4dfc-be7b-460730267cde', 1, NULL, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'follow', NOW()),
('9b148da9-b1b9-4dfc-be7b-460730267cde', NULL, 1, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'review', NOW()),
('9b148da9-b1b9-4dfc-be7b-460730267cde', NULL, NULL, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'reply', NOW()),
('9b148da9-b1b9-4dfc-be7b-460730267cde', NULL, 2, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'mention', NOW()),
('9b148da9-b1b9-4dfc-be7b-460730267cde', 2, NULL, '9b148da9-b1b9-4dfc-be7b-460730267cde', 'follow', NOW());

-- Add product_id to some notifications
UPDATE notifications SET product_id = 1 WHERE notification_id = 2;

-- Add post_id to some notifications
UPDATE notifications SET post_id = 1 WHERE notification_id = 3;