// All site content lives here, in both languages. Edit this file to update the portfolio.
export type Lang = 'pt-br' | 'en';
type T = Record<Lang, string>;

export const profile = {
  name: 'Antony Moreira',
  // Profile photo: GitHub avatar (updates with GitHub). To use your own, drop public/photo.jpg and set '/photo.jpg'.
  photo: 'https://avatars.githubusercontent.com/u/64423160?s=400&v=4',
  role: {
    'pt-br': 'Senior DevOps / Platform Engineer · SRE · Kubernetes',
    en: 'Senior DevOps / Platform Engineer · SRE · Kubernetes',
  } as T,
  location: { 'pt-br': 'Uberlândia, MG — Brasil', en: 'Uberlândia, MG — Brazil' } as T,
  tagline: {
    'pt-br':
      'Construo plataformas cloud escaláveis, seguras e altamente disponíveis para sistemas financeiros de alta performance — com Kubernetes, Terraform, CI/CD e muita automação.',
    en: 'I build scalable, secure and highly available cloud platforms for high-performance financial systems — with Kubernetes, Terraform, CI/CD and a lot of automation.',
  } as T,
  about: {
    'pt-br': [
      'Sou Senior DevOps / Platform Engineer na Trustly, onde cuido de infraestrutura AWS e Amazon EKS para serviços financeiros: autoscaling com Karpenter (até 40% de redução no custo mensal do EKS), policy-as-code com Kyverno e a migração da empresa para o Kong API Gateway.',
      'Antes, passei mais de 3 anos como SRE/DevOps na IBM, com Kubernetes, Terraform, GitHub Actions e observabilidade (Splunk, Grafana, Prometheus, Datadog). Comecei no suporte e na infraestrutura, e isso ainda guia meu jeito de trabalhar: soluções simples, documentadas e fáceis de operar.',
      'Fora do trabalho, mantenho um homelab que funciona como um pequeno datacenter — os projetos abaixo — onde testo na prática as ferramentas e os padrões que levo para produção.',
    ],
    en: [
      "I'm a Senior DevOps / Platform Engineer at Trustly, running AWS and Amazon EKS infrastructure for financial services: Karpenter autoscaling (up to 40% lower monthly EKS cost), Kyverno policy-as-code and the company-wide move to Kong API Gateway.",
      'Before that I spent 3+ years as an SRE/DevOps engineer at IBM, working with Kubernetes, Terraform, GitHub Actions and observability (Splunk, Grafana, Prometheus, Datadog). I started in support and infrastructure, which still shapes how I work: simple, documented, easy-to-operate solutions.',
      'Outside work I run a homelab that works like a small datacenter — the projects below — where I try out in practice the tools and patterns I bring to production.',
    ],
  },
  links: {
    github: 'https://github.com/antony-moreira',
    linkedin: 'https://www.linkedin.com/in/antony-moreira-0a9970123',
    email: '', // optional public contact email
  },
};

export const stats: { value: string; label: T }[] = [
  { value: '6+', label: { 'pt-br': 'anos em DevOps / SRE', en: 'years in DevOps / SRE' } },
  { value: '−40%', label: { 'pt-br': 'custo mensal do EKS com Karpenter', en: 'monthly EKS cost with Karpenter' } },
  { value: 'AWS', label: { 'pt-br': 'Certified Cloud Practitioner', en: 'Certified Cloud Practitioner' } },
];

export interface Job {
  company: string;
  role: T;
  period: T;
  location: string;
  points: Record<Lang, string[]>;
  tags: string[];
}

export const experience: Job[] = [
  {
    company: 'Trustly',
    role: { 'pt-br': 'Senior DevOps / Platform Engineer', en: 'Senior DevOps / Platform Engineer' },
    period: { 'pt-br': 'set 2025 — atual', en: 'Sep 2025 — present' },
    location: '',
    points: {
      'pt-br': [
        'Infraestrutura AWS com Terraform e GitHub Actions; Karpenter para autoscaling dinâmico de nós, reduzindo em até 40% o custo mensal do EKS',
        'Kyverno (policy-as-code) nos clusters Kubernetes: guardrails de segurança, fim de misconfigurations e compliance do setor financeiro',
        'Liderei a migração da empresa do Nginx-Edge legado para o Kong API Gateway, centralizando o tráfego dos serviços financeiros principais',
        'Pipelines e scripts operacionais (Python/Shell) para acelerar desenvolvedores e aumentar a resiliência',
      ],
      en: [
        'AWS infrastructure with Terraform and GitHub Actions; Karpenter for dynamic node autoscaling, cutting monthly EKS costs by up to 40%',
        'Kyverno policy-as-code across Kubernetes clusters: security guardrails, no misconfigurations and financial-sector compliance',
        'Led the company-wide migration from legacy Nginx-Edge to Kong API Gateway, centralizing traffic for core financial services',
        'Automated pipelines and operational scripts (Python/Shell) to improve developer velocity and resilience',
      ],
    },
    tags: ['AWS', 'Amazon EKS', 'Karpenter', 'Kyverno', 'Kong', 'Terraform', 'GitHub Actions'],
  },
  {
    company: 'IBM',
    role: { 'pt-br': 'SRE | DevOps Engineer', en: 'SRE | DevOps Engineer' },
    period: { 'pt-br': 'mai 2022 — set 2025', en: 'May 2022 — Sep 2025' },
    location: 'Uberlândia, MG',
    points: {
      'pt-br': [
        'Docker e Kubernetes (Amazon EKS) para aplicações críticas, com deploys automatizados via GitHub Actions',
        'Observabilidade com Splunk (logs, compliance e troubleshooting em ambientes sensíveis), Grafana, Prometheus e Datadog',
        'Terraform para provisionar infraestrutura segura e escalável na AWS',
        'Scripts e integrações em Shell e Python; Kanban e melhoria contínua',
      ],
      en: [
        'Docker and Kubernetes (Amazon EKS) for critical applications, with deployments automated through GitHub Actions',
        'Observability with Splunk (logs, compliance and troubleshooting in sensitive environments), Grafana, Prometheus and Datadog',
        'Terraform for secure, scalable infrastructure on AWS',
        'Operational scripts and integrations in Shell and Python; Kanban and continuous improvement',
      ],
    },
    tags: ['Amazon EKS', 'Terraform', 'Splunk', 'Datadog', 'Grafana', 'Prometheus'],
  },
  {
    company: 'Grupo FCamara',
    role: { 'pt-br': 'DevOps Engineer | SRE', en: 'DevOps Engineer | SRE' },
    period: { 'pt-br': 'fev 2022 — mai 2022', en: 'Feb 2022 — May 2022' },
    location: 'Florianópolis, SC',
    points: {
      'pt-br': [
        'Docker, Kubernetes e GitHub Actions para CI/CD de aplicações na Azure',
        'Terraform para automatizar Azure (EventHub, EventGrid, Azure Functions)',
      ],
      en: [
        'Docker, Kubernetes and GitHub Actions for CI/CD of applications on Azure',
        'Terraform to automate Azure (EventHub, EventGrid, Azure Functions)',
      ],
    },
    tags: ['Azure', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    company: 'Cognyte',
    role: { 'pt-br': 'Analista DevOps', en: 'DevOps Analyst' },
    period: { 'pt-br': 'fev 2021 — fev 2022', en: 'Feb 2021 — Feb 2022' },
    location: 'Florianópolis, SC',
    points: {
      'pt-br': [
        'CI/CD com Jenkins, Git e Docker',
        'Administração de ferramentas de produção (Graylog, GitLab, Grafana) e ambientes em AWS e Azure; firewall pfSense',
      ],
      en: [
        'CI/CD with Jenkins, Git and Docker',
        'Ran production tools (Graylog, GitLab, Grafana) and environments on AWS and Azure; pfSense firewall',
      ],
    },
    tags: ['Jenkins', 'GitLab', 'Graylog', 'AWS', 'Azure'],
  },
  {
    company: 'CroSoften',
    role: { 'pt-br': 'Analista DevOps / Infraestrutura', en: 'DevOps / Infrastructure Analyst' },
    period: { 'pt-br': 'jul 2020 — fev 2021', en: 'Jul 2020 — Feb 2021' },
    location: 'Uberlândia, MG',
    points: {
      'pt-br': [
        'Servidores Linux de homologação e produção; ambientes em AWS, GCP e Azure',
        'CI/CD com Jenkins e Docker, publicação de apps nas lojas Google e Apple, MySQL e firewalls (iptables, UFW, pfSense)',
      ],
      en: [
        'Linux staging and production servers; environments on AWS, GCP and Azure',
        'CI/CD with Jenkins and Docker, app releases to Google and Apple stores, MySQL and firewalls (iptables, UFW, pfSense)',
      ],
    },
    tags: ['Linux', 'Jenkins', 'AWS', 'GCP', 'MySQL'],
  },
  {
    company: 'ASC Brazil · Prefeitura de Pirapora',
    role: { 'pt-br': 'Help Desk N1 · Líder de Help Desk', en: 'Help Desk L1 · Help Desk Lead' },
    period: { 'pt-br': 'ago 2017 — jul 2020', en: 'Aug 2017 — Jul 2020' },
    location: 'Minas Gerais',
    points: {
      'pt-br': [
        'Liderei uma equipe de 3 pessoas mantendo a conectividade (internet e VoIP) de 15 unidades de saúde do município',
        'Suporte presencial e por telefone, com bastante contato com Linux e MySQL',
      ],
      en: [
        "Led a team of 3 keeping connectivity (internet and VoIP) running for the city's 15 health units",
        'On-site and phone support, with a lot of hands-on Linux and MySQL',
      ],
    },
    tags: ['Linux', 'Networking', 'VoIP', 'MySQL'],
  },
];

export const education = {
  degree: { 'pt-br': 'Bacharelado em Sistemas de Informação', en: "Bachelor's in Information Systems" } as T,
  school: 'Faculdades Prominas · 2014 — 2017',
  certs: ['AWS Certified Cloud Practitioner'],
};

export const skills: { group: T; items: string[] }[] = [
  {
    group: { 'pt-br': 'Cloud', en: 'Cloud' },
    items: ['AWS', 'Amazon EKS', 'Azure', 'GCP', 'Karpenter'],
  },
  {
    group: { 'pt-br': 'Containers & Kubernetes', en: 'Containers & Kubernetes' },
    items: ['Kubernetes', 'Docker', 'Helm', 'Argo CD', 'Kyverno', 'Kong API Gateway', 'Traefik / Gateway API', 'cert-manager', 'Sealed Secrets'],
  },
  {
    group: { 'pt-br': 'IaC & CI/CD', en: 'IaC & CI/CD' },
    items: ['Terraform', 'GitHub Actions', 'Jenkins', 'GitLab CI', 'GitOps', 'Kubespray', 'cloud-init'],
  },
  {
    group: { 'pt-br': 'Observabilidade', en: 'Observability' },
    items: ['Splunk', 'Datadog', 'Grafana', 'Prometheus', 'VictoriaMetrics', 'Graylog', 'Alertmanager'],
  },
  {
    group: { 'pt-br': 'Infra & Linux', en: 'Infra & Linux' },
    items: ['Linux', 'Proxmox VE', 'Networking & DNS', 'pfSense / iptables', 'NFS', 'MySQL / MariaDB'],
  },
  {
    group: { 'pt-br': 'Automação', en: 'Automation' },
    items: ['Python', 'Shell Script', 'MCP (Model Context Protocol)', 'Kanban'],
  },
];

export { projects } from './projects';
export type { Project } from './projects';
