// Related content mapping for guides and blog posts
export const relatedContentMap: Record<string, Array<{
  title: string
  description: string
  href: string
  type: "guide" | "blog" | "topic"
}>> = {
  "llm-assisted-coding": [
    {
      title: "Writing Effective Specifications",
      description: "Master specification writing that enables 3-4x development velocity gains",
      href: "/guides/writing-effective-specs",
      type: "guide"
    },
    {
      title: "Compliance Mapping",
      description: "Map regulatory requirements to technical specifications",
      href: "/guides/compliance-mapping",
      type: "guide"
    },
    {
      title: "How We Build Complex Apps",
      description: "Our approach to building software with type theory and LLM assistance",
      href: "/blog/2025-12-18-how-we-build-complex-apps",
      type: "blog"
    },
    {
      title: "Spec-Driven Development Hub",
      description: "Comprehensive guides on specification-driven development",
      href: "/topics/spec-driven-development",
      type: "topic"
    }
  ],
  "writing-effective-specs": [
    {
      title: "LLM-Assisted Development",
      description: "Transform development velocity through systematic LLM integration",
      href: "/guides/llm-assisted-coding",
      type: "guide"
    },
    {
      title: "Compliance Mapping",
      description: "Build regulatory requirements into your specifications",
      href: "/guides/compliance-mapping",
      type: "guide"
    },
    {
      title: "How We Build Complex Apps",
      description: "Real-world examples of spec-driven development in action",
      href: "/blog/2025-12-18-how-we-build-complex-apps",
      type: "blog"
    }
  ],
  "compliance-mapping": [
    {
      title: "Writing Effective Specifications",
      description: "Learn how to write specifications that embed compliance requirements",
      href: "/guides/writing-effective-specs",
      type: "guide"
    },
    {
      title: "GDPR Compliance",
      description: "Comprehensive guide to GDPR compliance in software development",
      href: "/guides/gdpr-compliance",
      type: "guide"
    },
    {
      title: "SOC 2 Implementation",
      description: "Step-by-step guide to achieving SOC 2 compliance",
      href: "/guides/soc2-implementation",
      type: "guide"
    },
    {
      title: "HIPAA Implementation",
      description: "Building HIPAA-compliant healthcare applications",
      href: "/guides/hipaa-implementation",
      type: "guide"
    }
  ],
  "gdpr-compliance": [
    {
      title: "Data Privacy with LLMs",
      description: "Protecting user data when using large language models",
      href: "/guides/data-privacy-llm",
      type: "guide"
    },
    {
      title: "Compliance Mapping",
      description: "Map GDPR requirements to technical specifications",
      href: "/guides/compliance-mapping",
      type: "guide"
    }
  ],
  "hipaa-implementation": [
    {
      title: "Compliance Mapping",
      description: "Map HIPAA requirements to technical controls",
      href: "/guides/compliance-mapping",
      type: "guide"
    },
    {
      title: "Data Privacy with LLMs",
      description: "Protecting PHI when using AI/ML systems",
      href: "/guides/data-privacy-llm",
      type: "guide"
    }
  ],
  "soc2-implementation": [
    {
      title: "Compliance Mapping",
      description: "Map SOC 2 controls to your architecture",
      href: "/guides/compliance-mapping",
      type: "guide"
    },
    {
      title: "Top Policy Enforcement Libraries",
      description: "Tools for implementing SOC 2 access controls",
      href: "/guides/top-policy-enforcement-libraries",
      type: "guide"
    }
  ],
  "prompt-injection-defense": [
    {
      title: "LLM Output Validation",
      description: "Validate and sanitize LLM outputs for security",
      href: "/guides/llm-output-validation",
      type: "guide"
    },
    {
      title: "Top LLM Security Tools",
      description: "Essential tools for securing LLM applications",
      href: "/guides/top-llm-security-tools",
      type: "guide"
    },
    {
      title: "Data Privacy with LLMs",
      description: "Protecting sensitive data in LLM applications",
      href: "/guides/data-privacy-llm",
      type: "guide"
    }
  ],
  "llm-output-validation": [
    {
      title: "Prompt Injection Defense",
      description: "Protect your LLM applications from prompt injection attacks",
      href: "/guides/prompt-injection-defense",
      type: "guide"
    },
    {
      title: "Top LLM Security Tools",
      description: "Essential security tools for LLM development",
      href: "/guides/top-llm-security-tools",
      type: "guide"
    }
  ],
  "data-privacy-llm": [
    {
      title: "GDPR Compliance",
      description: "Ensure GDPR compliance in your LLM applications",
      href: "/guides/gdpr-compliance",
      type: "guide"
    },
    {
      title: "HIPAA Implementation",
      description: "Build HIPAA-compliant LLM features",
      href: "/guides/hipaa-implementation",
      type: "guide"
    },
    {
      title: "Prompt Injection Defense",
      description: "Prevent data leakage through prompt injection",
      href: "/guides/prompt-injection-defense",
      type: "guide"
    }
  ],
  "top-llm-security-tools": [
    {
      title: "Prompt Injection Defense",
      description: "Strategies for defending against prompt injection",
      href: "/guides/prompt-injection-defense",
      type: "guide"
    },
    {
      title: "LLM Output Validation",
      description: "Validate LLM outputs for security and correctness",
      href: "/guides/llm-output-validation",
      type: "guide"
    }
  ],
  "top-compliance-automation-tools": [
    {
      title: "Compliance Mapping",
      description: "Map compliance requirements to your architecture",
      href: "/guides/compliance-mapping",
      type: "guide"
    },
    {
      title: "SOC 2 Implementation",
      description: "Achieve SOC 2 compliance with automation",
      href: "/guides/soc2-implementation",
      type: "guide"
    }
  ],
  "top-policy-enforcement-libraries": [
    {
      title: "Compliance Mapping",
      description: "Implement policy enforcement in your specifications",
      href: "/guides/compliance-mapping",
      type: "guide"
    },
    {
      title: "SOC 2 Implementation",
      description: "Use policy libraries for SOC 2 access controls",
      href: "/guides/soc2-implementation",
      type: "guide"
    }
  ],
  "2025-12-18-how-we-build-complex-apps": [
    {
      title: "LLM-Assisted Development",
      description: "Enterprise guide to LLM-assisted development",
      href: "/guides/llm-assisted-coding",
      type: "guide"
    },
    {
      title: "Writing Effective Specifications",
      description: "Master the art of writing specifications for LLM development",
      href: "/guides/writing-effective-specs",
      type: "guide"
    },
    {
      title: "All Topic Hubs",
      description: "Explore comprehensive guides on software development",
      href: "/topics",
      type: "topic"
    }
  ]
}

export function getRelatedContent(slug: string) {
  return relatedContentMap[slug] || []
}
