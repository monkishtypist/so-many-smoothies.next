# So Many Smoothies - Next.js App

Welcome to **So Many Smoothies**, a modern Next.js app for managing and showcasing delicious smoothie recipes. This project leverages Sanity.io for content management, Next.js for the frontend, and is optimized for static site generation (SSG) deployed to S3.


## Features

- **Smoothie Recipe Management**: Fetch and display smoothie recipes from Sanity CMS.
- **Dynamic Routing**: Detailed pages for each smoothie using dynamic routes.
- **Static Site Generation (SSG)**: Optimized for deployment to S3 with efficient build outputs.
- **Image Handling**: Leveraging Sanity's image CDN and Next.js `<Image>` for optimized image rendering.
- **Custom API Fetching**: Configurable caching and custom headers for API requests.


## Getting Started

### Prerequisites

- Node.js >= 18
- `pnpm` package manager (install via `npm install -g pnpm`)
- A configured Sanity.io project
- AWS credentials (if deploying to S3)


### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/<your-username>/so-many-smoothies.next.git
    cd so-many-smoothies.next
    ```

2. **Install dependencies**:
    ```bash
    Copy code
    pnpm install
    ```

3. **Environment Variables**: Create a `.env.local` file in the root of the project:
    ```env
    Copy code
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_SANITY_API_VERSION=2023-01-01
    ```


## Development
Start the development server:

```bash
pnpm run dev
```

Visit the app at [http://localhost:3000](http://localhost:3000).


## Building for Production
1. Build the static site:
    ```bash
    pnpm run build
    ```

2. Preview the build:
    ```bash
    pnpm run start
    ```

3. Deploy the contents of the out/ directory to your S3 bucket.


## Deployment
This app is set up for static deployment to an AWS S3 bucket.

### Steps:
1. Ensure next.config.js is configured with:
    ```javascript
    output: 'export',
    images: {
    unoptimized: true,
    }
    ```

2. Sync the out/ directory to S3:
    ```bash
    aws s3 sync ./out/ s3://<your-bucket-name> --delete
    ```

3. Invalidate your CloudFront distribution (if applicable):
    ```bash
    aws cloudfront create-invalidation --distribution-id <distribution-id> --paths "/*"
    ```


## Scripts
- `pnpm run dev`: Start the development server.
- `pnpm run build`: Build the app for production.
- `pnpm run start`: Serve the built app locally.
- `pnpm run lint`: Lint the codebase.
- `pnpm run format`: Format the codebase with Prettier.


## Project Structure
```plaintext
.
├── app/                    # Application logic and pages
│   ├── smoothies/          # Dynamic smoothie detail pages
│   └── _services/          # API services (e.g., Sanity client)
├── public/                 # Static assets
├── styles/                 # Global styles
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── .env.local              # Environment variables
```


## Tech Stack

- Next.js: Framework for server-rendered React applications.
- Sanity.io: Headless CMS for content management.
- AWS S3: For static site hosting.
- pnpm: Fast, efficient package manager.


## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
    ```bash
    git checkout -b feature/<feature-name>
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature: <description>"
    ```
4. Push your branch:
    ```bash
    git push origin feature/<feature-name>
    ```
5. Create a pull request.


## License
This project is licensed under the MIT License.

