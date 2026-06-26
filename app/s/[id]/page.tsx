import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FollowUpPromptCard } from "@/components/follow-up-prompt-card"
import { Header } from "@/components/header"
import { MainCard } from "@/components/main-card"
import { ShareLinkOpenedTracker } from "@/components/ShareLinkOpenedTracker"
import { fetchFollowUpQuestions, fetchQuestionById } from "@/lib/questions"
import { recordShareEvent } from "@/lib/share-analytics"
import {
  buildSharedQuestionMetadata,
  buildShareNotFoundMetadata,
  OG_DESCRIPTION,
} from "@/lib/share"

export const revalidate = 0

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const questionId = Number(id)

  if (Number.isNaN(questionId)) {
    return {
      title: "Question not found | Convo & Chill",
      description: OG_DESCRIPTION,
    }
  }

  const question = await fetchQuestionById(questionId)

  if (!question) {
    return buildShareNotFoundMetadata(questionId)
  }

  return buildSharedQuestionMetadata({
    id: question.id,
    promptText: question.promptText,
    categoryTitle: question.categoryTitle,
  })
}

export default async function SharedQuestionPage({ params }: PageProps) {
  const { id } = await params
  const questionId = Number(id)

  if (Number.isNaN(questionId)) {
    notFound()
  }

  const question = await fetchQuestionById(questionId)

  if (!question) {
    notFound()
  }

  void recordShareEvent(questionId)

  const followUps = await fetchFollowUpQuestions(
    question.categoryId,
    questionId,
    3
  )

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 bg-[#0A0A0F] px-4 pb-10 pt-6">
      <ShareLinkOpenedTracker
        questionId={question.id}
        categoryTitle={question.categoryTitle}
      />
      <Header />

      <div className="flex flex-1 flex-col">
        <MainCard
          question={{
            text: question.promptText,
            category: question.categoryTitle,
          }}
          animationKey={question.id}
        />

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-br from-[oklch(0.62_0.27_330)] to-[oklch(0.55_0.24_295)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_oklch(0.62_0.27_330_/_0.7)] transition-transform hover:scale-105"
          >
            Explore more prompts →
          </Link>
        </div>

        {followUps.length > 0 && (
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              More prompts
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {followUps.map((followUp) => (
                <Link
                  key={followUp.id}
                  href={`/s/${followUp.id}`}
                  className="shrink-0 transition-transform hover:scale-[1.02]"
                >
                  <FollowUpPromptCard
                    category={followUp.categoryTitle}
                    question={followUp.promptText}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
