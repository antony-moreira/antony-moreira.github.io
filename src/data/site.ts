// All site content lives here, in both languages. Edit this file to update the portfolio.
export type Lang = 'pt-br' | 'en';
type T = Record<Lang, string>;

export const profile = {
  name: 'Antony Moreira',
  // TODO: adjust your title/role and bio.
  role: {
    'pt-br': 'Infraestrutura · DevOps · Homelab',
    en: 'Infrastructure · DevOps · Homelab',
  } as T,
  tagline: {
    'pt-br':
      'Construo e opero infraestrutura de ponta a ponta: virtualização, Kubernetes, GitOps, observabilidade e automação — tudo versionado em código.',
    en: 'I build and run infrastructure end to end: virtualization, Kubernetes, GitOps, observability and automation — all versioned as code.',
  } as T,
  about: {
    'pt-br': [
      'Mantenho um homelab que funciona como um pequeno datacenter: cluster Proxmox com 3 nós, um cluster Kubernetes gerenciado por GitOps, NAS, backups automatizados e alertas no Telegram.',
      'Gosto de soluções simples, documentadas e reproduzíveis. Cada mudança passa pelo Git, cada incidente vira um relatório e cada decisão fica registrada.',
    ],
    en: [
      'I run a homelab that works like a small datacenter: a 3-node Proxmox cluster, a GitOps-managed Kubernetes cluster, a NAS, automated backups and Telegram alerting.',
      'I like simple, documented, reproducible solutions. Every change goes through Git, every incident becomes a report and every decision is written down.',
    ],
  },
  links: {
    github: 'https://github.com/antony-moreira',
    linkedin: '', // TODO: e.g. https://www.linkedin.com/in/your-profile
    email: '', // TODO: public contact email (optional)
  },
};

export const skills: { group: T; items: string[] }[] = [
  {
    group: { 'pt-br': 'Infraestrutura', en: 'Infrastructure' },
    items: ['Proxmox VE', 'Terraform', 'cloud-init', 'Linux (Debian/Ubuntu)', 'NFS / OpenMediaVault', 'Networking & DNS'],
  },
  {
    group: { 'pt-br': 'Containers & Kubernetes', en: 'Containers & Kubernetes' },
    items: ['Kubernetes', 'Kubespray', 'Helm', 'Argo CD', 'Docker Compose', 'Traefik / Gateway API', 'cert-manager', 'Sealed Secrets'],
  },
  {
    group: { 'pt-br': 'Observabilidade', en: 'Observability' },
    items: ['VictoriaMetrics', 'Prometheus', 'Grafana', 'Alertmanager', 'node-exporter', 'cAdvisor'],
  },
  {
    group: { 'pt-br': 'Automação & Código', en: 'Automation & Code' },
    items: ['Git / GitOps', 'GitHub Actions', 'Bash', 'Python', 'MCP (Model Context Protocol)'],
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
