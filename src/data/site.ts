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

export interface Project {
  slug: T; // URL segment per language
  title: T;
  summary: T;
  stack: string[];
  highlights: Record<Lang, string[]>;
  // Long description: paragraphs per language.
  body: Record<Lang, string[]>;
  // Architecture as ordered layers (rendered as a stacked diagram).
  layers?: { name: T; items: string[] }[];
  repo?: string; // public repo URL (leave empty for private repos)
  metric?: { value: string; label: T };
}

export const projects: Project[] = [
  {
    slug: { 'pt-br': 'kubernetes-gitops', en: 'kubernetes-gitops' },
    title: { 'pt-br': 'Cluster Kubernetes com GitOps', en: 'GitOps Kubernetes Cluster' },
    summary: {
      'pt-br':
        'Cluster Kubernetes sobre Proxmox provisionado com Terraform + Kubespray e gerenciado 100% por Argo CD (app-of-apps).',
      en: 'Kubernetes cluster on Proxmox, provisioned with Terraform + Kubespray and managed 100% by Argo CD (app-of-apps).',
    },
    stack: ['Terraform', 'Kubespray', 'Kubernetes', 'Argo CD', 'Helm', 'Traefik', 'cert-manager', 'Sealed Secrets', 'MetalLB', 'NFS CSI'],
    metric: { value: '5', label: { 'pt-br': 'nós K8s (2 control-plane + 3 workers)', en: 'K8s nodes (2 control-plane + 3 workers)' } },
    highlights: {
      'pt-br': [
        'VMs criadas com Terraform (provider bpg/proxmox) a partir de templates cloud-init',
        'Kubernetes instalado com Kubespray; etcd com 3 membros e backup agendado',
        'Argo CD auto-gerenciado: um ApplicationSet cria um app por pasta no Git',
        'Helm chart próprio para apps: persistência, volumes NFS, probes e backup diário com verificação de integridade do SQLite',
        'TLS wildcard com cert-manager, Traefik via Gateway API e segredos criptografados no Git (Sealed Secrets)',
        'Migração de dezenas de apps do Docker Compose para o cluster sem perda de dados',
      ],
      en: [
        'VMs created with Terraform (bpg/proxmox provider) from cloud-init templates',
        'Kubernetes installed with Kubespray; 3-member etcd with scheduled backups',
        'Self-managed Argo CD: an ApplicationSet creates one app per folder in Git',
        'Custom Helm chart for apps: persistence, NFS volumes, probes and daily backups with SQLite integrity checks',
        'Wildcard TLS via cert-manager, Traefik through the Gateway API and encrypted secrets in Git (Sealed Secrets)',
        'Migrated dozens of apps from Docker Compose to the cluster with no data loss',
      ],
    },
    body: {
      'pt-br': [
        'O objetivo foi sair de um único host Docker para uma plataforma declarativa, onde o estado do cluster é exatamente o que está no Git. Nenhuma mudança é aplicada à mão: um commit é o deploy.',
        'Cada aplicação é uma pasta com um values.yaml. O ApplicationSet descobre a pasta, gera a Application e o Argo CD sincroniza. Dados ficam em SSD local (bancos SQLite) ou em NFS servido por uma VM OpenMediaVault com HD dedicado.',
        'Todo incidente gera um relatório (causa, impacto, correção) e as decisões de arquitetura ficam registradas em um documento próprio.',
      ],
      en: [
        'The goal was to move from a single Docker host to a declarative platform, where the cluster state is exactly what is in Git. Nothing is applied by hand: a commit is the deploy.',
        'Each application is a folder with a values.yaml. The ApplicationSet discovers the folder, generates the Application and Argo CD syncs it. Data lives on local SSD (SQLite databases) or on NFS served by an OpenMediaVault VM with a dedicated disk.',
        'Every incident gets a report (cause, impact, fix) and architecture decisions are recorded in their own document.',
      ],
    },
    layers: [
      { name: { 'pt-br': 'Git (fonte da verdade)', en: 'Git (source of truth)' }, items: ['Terraform', 'Helm values', 'SealedSecrets'] },
      { name: { 'pt-br': 'GitOps', en: 'GitOps' }, items: ['Argo CD', 'ApplicationSet', 'app-of-apps'] },
      { name: { 'pt-br': 'Plataforma', en: 'Platform' }, items: ['Traefik', 'cert-manager', 'MetalLB', 'CSI NFS', 'VictoriaMetrics'] },
      { name: { 'pt-br': 'Kubernetes', en: 'Kubernetes' }, items: ['2 control-plane', '3 workers', 'etcd ×3'] },
      { name: { 'pt-br': 'Virtualização', en: 'Virtualization' }, items: ['Proxmox VE', 'cloud-init', 'NAS OMV'] },
    ],
  },
  {
    slug: { 'pt-br': 'homelab-docker', en: 'homelab-docker' },
    title: { 'pt-br': 'Homelab Self-Hosted', en: 'Self-Hosted Homelab' },
    summary: {
      'pt-br':
        'Cluster Proxmox com 3 nós rodando ~20 serviços em Docker Compose, com deploy GitOps, proxy reverso, DNS redundante e backups.',
      en: 'A 3-node Proxmox cluster running ~20 Docker Compose services, with GitOps deploys, reverse proxy, redundant DNS and backups.',
    },
    stack: ['Proxmox VE', 'Docker Compose', 'Traefik', 'AdGuard Home', 'Tailscale', 'Nextcloud', 'Jellyfin', 'Uptime Kuma'],
    metric: { value: '3', label: { 'pt-br': 'nós Proxmox em quórum', en: 'Proxmox nodes in quorum' } },
    highlights: {
      'pt-br': [
        'Cluster Proxmox com quórum de 3 votos: qualquer nó pode cair sem parar o cluster',
        'Cada serviço é uma pasta no repositório; deploy por GitOps (Dockhand)',
        'Traefik com HTTPS wildcard e DNS local redundante (AdGuard Home sincronizado)',
        'Acesso remoto seguro via Tailscale, sem portas abertas',
        'Backups semanais das VMs e proteção contra escrita no disco de mídia quando ele não está montado',
      ],
      en: [
        '3-vote Proxmox quorum: any node can go down without stopping the cluster',
        'Each service is a folder in the repo; deployed via GitOps (Dockhand)',
        'Traefik with wildcard HTTPS and redundant local DNS (synced AdGuard Home)',
        'Secure remote access through Tailscale, no open ports',
        'Weekly VM backups and write protection on the media disk mountpoint when it is not mounted',
      ],
    },
    body: {
      'pt-br': [
        'É a base de tudo: mídia, arquivos, fotos, dashboards e automações da casa, rodando em mini PCs de baixo consumo.',
        'O repositório é público, então nenhum segredo vai para o Git — eles ficam só no servidor. O README documenta cada stack e como recuperá-la.',
      ],
      en: [
        'This is the foundation for everything: media, files, photos, dashboards and home automations, running on low-power mini PCs.',
        'The repository is public, so no secret ever goes to Git — they only live on the server. The README documents every stack and how to recover it.',
      ],
    },
    repo: 'https://github.com/antony-moreira/homelab',
  },
  {
    slug: { 'pt-br': 'observabilidade', en: 'observability' },
    title: { 'pt-br': 'Observabilidade e Alertas', en: 'Observability & Alerting' },
    summary: {
      'pt-br':
        'Troca de Netdata + Prometheus por VictoriaMetrics, com dashboards Grafana provisionados por código e alertas compactos no Telegram.',
      en: 'Replaced Netdata + Prometheus with VictoriaMetrics, with code-provisioned Grafana dashboards and compact Telegram alerts.',
    },
    stack: ['VictoriaMetrics', 'vmalert', 'Alertmanager', 'Grafana', 'node-exporter', 'cAdvisor', 'SMART'],
    metric: { value: '−90%', label: { 'pt-br': 'de RAM (~1,2 GB → ~110 MiB)', en: 'RAM (~1.2 GB → ~110 MiB)' } },
    highlights: {
      'pt-br': [
        'Uso de memória da stack caiu de ~1,2 GB para ~110 MiB',
        'Coleta de hosts, containers, temperatura de CPU e saúde SMART dos discos',
        'Regras de alerta para host fora do ar, disco cheio, temperatura, disco ausente e containers no limite de memória',
        'Template de mensagem próprio: emoji por stack, alvo, duração e horário local',
        'Alertas do homelab e do cluster Kubernetes separados, no mesmo bot',
        'Datasources e dashboards Grafana provisionados a partir de arquivos versionados',
      ],
      en: [
        'Stack memory usage dropped from ~1.2 GB to ~110 MiB',
        'Collects hosts, containers, CPU temperature and disk SMART health',
        'Alert rules for host down, disk full, temperature, missing disk and containers near their memory limit',
        'Custom message template: emoji per stack, target, duration and local time',
        'Homelab and Kubernetes alerts kept separate, through the same bot',
        'Grafana datasources and dashboards provisioned from versioned files',
      ],
    },
    body: {
      'pt-br': [
        'Em hardware modesto, o monitoramento não pode custar mais que as aplicações. A migração para VictoriaMetrics manteve a compatibilidade com PromQL e os dashboards existentes, com uma fração do consumo.',
        'No cluster Kubernetes, o mesmo padrão roda via victoria-metrics-k8s-stack, gerenciado pelo Argo CD.',
      ],
      en: [
        'On modest hardware, monitoring must not cost more than the apps. Moving to VictoriaMetrics kept PromQL compatibility and the existing dashboards at a fraction of the cost.',
        'On the Kubernetes cluster, the same pattern runs through victoria-metrics-k8s-stack, managed by Argo CD.',
      ],
    },
    repo: 'https://github.com/antony-moreira/homelab/tree/main/apps/monitoring-stack',
  },
  {
    slug: { 'pt-br': 'servidor-mcp', en: 'mcp-server' },
    title: { 'pt-br': 'Servidor MCP para Operação com IA', en: 'MCP Server for AI-Assisted Ops' },
    summary: {
      'pt-br':
        'Servidor MCP (Model Context Protocol) em Python que dá a assistentes de IA ferramentas seguras para operar Docker, Proxmox e SSH.',
      en: 'A Python MCP (Model Context Protocol) server that gives AI assistants safe tools to operate Docker, Proxmox and SSH.',
    },
    stack: ['Python', 'MCP', 'Proxmox API', 'Docker SDK', 'Paramiko', 'OAuth'],
    metric: { value: '24', label: { 'pt-br': 'ferramentas expostas', en: 'tools exposed' } },
    highlights: {
      'pt-br': [
        '24 ferramentas: containers (logs, stats, ações), VMs (snapshots, rollback, backups), storage e rotas do Traefik',
        'Acesso remoto autenticado via OAuth, usável a partir do Claude',
        'Diagnóstico de incidentes em linguagem natural: "por que esse container reiniciou?"',
        'Empacotado como container e implantado junto com o resto do homelab',
      ],
      en: [
        '24 tools: containers (logs, stats, actions), VMs (snapshots, rollback, backups), storage and Traefik routes',
        'Authenticated remote access via OAuth, usable from Claude',
        'Natural-language incident triage: "why did this container restart?"',
        'Packaged as a container and deployed with the rest of the homelab',
      ],
    },
    body: {
      'pt-br': [
        'Assistentes de IA são úteis em operação quando enxergam o ambiente real. Este servidor expõe exatamente as operações necessárias, com escopo definido, em vez de um shell irrestrito.',
      ],
      en: [
        'AI assistants are useful in operations when they can see the real environment. This server exposes exactly the operations needed, with a defined scope, instead of an unrestricted shell.',
      ],
    },
    repo: 'https://github.com/antony-moreira/homelab/tree/main/apps/mcp-ssh-server',
  },
];
