# 10 Minute School Frontend Assessment - IELTS Course Page

এটি একটি Next.js অ্যাপ্লিকেশন যা 10 Minute School এর IELTS কোর্স পেজের একটি রেপ্লিকা। এই প্রজেক্টটি Frontend Engineer (Level 1) Assessment এর জন্য তৈরি করা হয়েছে।

## 🚀 Live Demo

[Live Demo Link](https://10-minute-school-frontend-assessmen-rosy.vercel.app)

## 📋 প্রয়োজনীয়তা

- Node.js 18+
- npm বা yarn
- Git

## 🛠️ ইনস্যারশন এবং সেটআপ

### 1. Repository Clone করুন

```bash
git clone https://github.com/md-nasim-mondal/10-minute-school-frontend-assessment
cd 10-minute-school-frontend-assessment
```

### 2. Dependencies ইনস্যার করুন

```bash
npm install
# অথবা
yarn install
```

### 3. Development Server চালু করুন

```bash
npm run dev
# অথবা
yarn dev
```

অ্যাপ্লিকেশনটি [http://localhost:3000](http://localhost:3000) এ চালু হবে।

### 4. Production Build তৈরি করুন

```bash
npm run build
npm start
# অথবা
yarn build
yarn start
```

## 🐳 Docker Setup (Optional)

### Dockerfile তৈরি করুন

```dockerfile:Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Commands

```bash
# Build Docker image
docker build -t 10minute-school-app .

# Run Docker container
docker run -p 3000:3000 10minute-school-app
```

## 🏗️ প্রজেক্ট স্ট্রাকচার

## 🎯 বাস্তবায়িত ফিচারসমূহ

### ✅ Required Features

- **Title**: Product title display
- **Description**: HTML description rendering
- **Course Instructors**: Instructor information from sections array
- **Product Trailer**: YouTube player integration
- **Default Price**: ৳1000 as default price
- **CTA Text**: Dynamic CTA from API data
- **Localization**: Bengali and English language support
- **Server-side Rendering (SSR)**: Full SSR implementation

### ✅ Good to Have Features

- **Course Layout**: Features section implementation
- **Learning Outcomes**: Pointers section
- **Course Exclusive Features**: Instructor section
- **Course Details**: About section
- **Checklist**: Course checklist display
- **Incremental Static Generation (ISR)**: Next.js ISR implementation
- **SEO**: Complete SEO meta tags with API data

## 🔧 ব্যবহৃত প্রযুক্তি

- **Framework**: Next.js 15.4.4 with App Router
- **Language**: TypeScript 5+
- **Styling**: TailwindCSS 4
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Custom SVG components
- **Image Optimization**: Next.js Image component

## 🌐 API Integration

### Endpoint

### Headers

### Query Parameters

- `lang`: Language preference (en/bn)

### Example cURL

```bash
curl --request GET \
  --url 'https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en' \
  --header 'X-TENMS-SOURCE-PLATFORM: web' \
  --header 'accept: application/json'
```

## 🎨 Key Features

### 1. Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Cross-browser compatibility

### 2. Performance Optimization

- Image optimization with Next.js Image
- Code splitting and lazy loading
- React Query for efficient data fetching
- ISR for optimal performance

### 3. SEO Optimization

- Dynamic meta tags
- Open Graph tags
- Twitter Card support
- Structured data

### 4. Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Screen reader friendly

### 5. Internationalization

- Bengali and English language support
- Dynamic language switching
- Localized content rendering

## 📱 Component Architecture

### Page Sections

- `CourseInfoSection`: Main course information
- `TrailerSection`: Video trailer with gallery
- `CourseInstructorSection`: Instructor details
- `FeaturesSection`: Course features
- `PointersSection`: Learning outcomes
- `AboutCourseSection`: Course description
- `ChecklistSection`: Course checklist
- `CallToActionSection`: Enrollment CTA

### Reusable Components

- `LanguageToggle`: Language switcher
- `Logo`: Brand logo component
- `NavLink`: Navigation links
- `SearchBar`: Search functionality

## 🔄 State Management

### React Query Integration

- Efficient data fetching and caching
- Background refetching
- Error handling and retry logic
- Optimistic updates

### Language Context

- Global language state
- Translation management
- Persistent language preference

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

- **Netlify**: Connect GitHub repository
- **Railway**: Docker deployment
- **AWS**: Using Docker container

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📝 Environment Variables

কোন environment variables প্রয়োজন নেই। সব API endpoints public।

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is created for assessment purposes.

## 👨‍💻 Developer

**[Your Name]**

- GitHub: [@md-nasim-mondal](https://github.com/md-nasim-mondal)
- Email: mdnasimmondal622@gmail.com

## 🙏 Acknowledgments

- 10 Minute School for the API and design reference
- Next.js team for the amazing framework
- Vercel for hosting platform
