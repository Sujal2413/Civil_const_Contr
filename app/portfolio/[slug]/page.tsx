import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects } from "@/lib/content";
import ProjectDetailPage from "@/components/ProjectDetailPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Buildings Architectural Group`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <ProjectDetailPage project={project} relatedProjects={relatedProjects} />
  );
}
