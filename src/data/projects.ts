// Project pages content, both languages. No IPs, domains or secrets here: this site is public.
import type { Lang } from './site';
type T = Record<Lang, string>;
type P = Record<Lang, string[]>;

export interface Project {
  slug: T; // URL segment per language
  title: T;
  summary: T;
  stack: string[];
  metric?: { value: string; label: T };
  repo?: string; // public repo URL (leave empty for private repos)
  body: P; // overview paragraphs
  highlights: P;
  layers?: { name: T; items: string[] }[]; // architecture, top → bottom
  diagram?: 'cluster'; // inline SVG diagram shown above the layers
  how?: { title: T; text: T }[]; // how it works, step by step
  decisions?: { title: T; why: T; tradeoff?: T }[];
  challenges?: { title: T; text: P }[];
  apps?: { group: T; items: string[] }[];
}

export const projects: Project[] = [
  // ───────────────────────────────────────────── Kubernetes ─────────────
  {
    slug: { 'pt-br': 'kubernetes-gitops', en: 'kubernetes-gitops' },
    diagram: 'cluster',
    title: { 'pt-br': 'Cluster Kubernetes com GitOps', en: 'GitOps Kubernetes Cluster' },
    summary: {
      'pt-br':
        'Cluster Kubernetes sobre Proxmox provisionado com Terraform + Kubespray e gerenciado 100% por Argo CD — da VM ao app, tudo em Git.',
      en: 'Kubernetes cluster on Proxmox, provisioned with Terraform + Kubespray and managed 100% by Argo CD — from VM to app, everything in Git.',
    },
    stack: ['Terraform', 'Kubespray', 'Kubernetes', 'Argo CD', 'Helm', 'Traefik', 'Gateway API', 'cert-manager', 'Sealed Secrets', 'MetalLB', 'NFS CSI', 'VictoriaMetrics'],
    metric: { value: '20+', label: { 'pt-br': 'apps entregues por GitOps', en: 'apps delivered through GitOps' } },
    body: {
      'pt-br': [
        'O objetivo foi sair de um único host Docker para uma plataforma declarativa, onde o estado do cluster é exatamente o que está no Git. Nada é aplicado à mão: um commit é o deploy, e reconstruir o cluster do zero é um comando.',
        'O projeto cobre a pilha inteira: VMs criadas por Terraform, Kubernetes instalado pelo Kubespray, componentes de plataforma (ingress, certificados, storage, segredos, métricas) e as aplicações migradas do Docker Compose — mídia, arquivos, dashboards e monitoramento.',
        'Cada decisão de arquitetura é registrada (contexto → decisão → consequências) e cada incidente vira um relatório com linha do tempo, causa raiz e ações.',
      ],
      en: [
        'The goal was to move from a single Docker host to a declarative platform, where the cluster state is exactly what is in Git. Nothing is applied by hand: a commit is the deploy, and rebuilding the cluster from scratch is one command.',
        'The project covers the whole stack: VMs created by Terraform, Kubernetes installed by Kubespray, platform components (ingress, certificates, storage, secrets, metrics) and the apps migrated from Docker Compose — media, files, dashboards and monitoring.',
        'Every architecture decision is recorded (context → decision → consequences) and every incident becomes a report with timeline, root cause and action items.',
      ],
    },
    highlights: {
      'pt-br': [
        'Do zero ao cluster sem passos manuais: terraform apply → ansible-playbook → bootstrap do Argo CD',
        'Control-plane com 2 masters e etcd com 3 membros (tolera a perda de um membro)',
        'Um ApplicationSet transforma cada pasta do Git em uma Application — app novo = um values.yaml',
        'Helm chart próprio com persistência, NFS, probes, RBAC e backup diário com verificação de integridade',
        'TLS wildcard automático, rotas via Gateway API e segredos criptografados dentro do Git',
        'Migração das aplicações do Docker Compose sem perda de dados, com os dois ambientes rodando em paralelo',
      ],
      en: [
        'From nothing to a cluster with no manual steps: terraform apply → ansible-playbook → Argo CD bootstrap',
        'Control plane with 2 masters and a 3-member etcd (survives losing one member)',
        'An ApplicationSet turns every folder in Git into an Application — new app = one values.yaml',
        'Custom Helm chart with persistence, NFS, probes, RBAC and daily backups with integrity checks',
        'Automatic wildcard TLS, routing through the Gateway API and encrypted secrets inside Git',
        'Apps migrated from Docker Compose with no data loss, both environments running side by side',
      ],
    },
    layers: [
      { name: { 'pt-br': 'Git (fonte da verdade)', en: 'Git (source of truth)' }, items: ['Terraform', 'Helm values', 'SealedSecrets', 'Grafana dashboards'] },
      { name: { 'pt-br': 'GitOps', en: 'GitOps' }, items: ['Argo CD', 'ApplicationSet', 'app-of-apps'] },
      { name: { 'pt-br': 'Plataforma', en: 'Platform' }, items: ['Traefik', 'cert-manager', 'MetalLB', 'CSI NFS', 'local-path', 'VictoriaMetrics'] },
      { name: { 'pt-br': 'Kubernetes', en: 'Kubernetes' }, items: ['2 control-plane', '3 workers', 'etcd ×3'] },
      { name: { 'pt-br': 'Virtualização', en: 'Virtualization' }, items: ['Proxmox VE', 'cloud-init', 'NAS OpenMediaVault'] },
    ],
    how: [
      {
        title: { 'pt-br': '1. Provisionamento', en: '1. Provisioning' },
        text: {
          'pt-br':
            'O Terraform (provider bpg/proxmox) clona um template Debian cloud padrão e o cloud-init configura IP estático e instala o guest agent na primeira inicialização. O IP é derivado do ID da VM, então os dois nunca divergem. O próprio Terraform gera o inventário do Kubespray e espera o cloud-init terminar — o próximo passo pode rodar direto.',
          en: 'Terraform (bpg/proxmox provider) clones a stock Debian cloud template and cloud-init sets a static IP and installs the guest agent on first boot. The IP is derived from the VM ID, so they can never drift apart. Terraform itself renders the Kubespray inventory and waits for cloud-init — the next step can run right away.',
        },
      },
      {
        title: { 'pt-br': '2. Kubernetes', en: '2. Kubernetes' },
        text: {
          'pt-br':
            'O Kubespray entra como submódulo fixado numa tag de release: instalações reproduzíveis e upgrades explícitos (move a tag → compara as variáveis → upgrade-cluster).',
          en: 'Kubespray is a git submodule pinned to a release tag: reproducible installs and explicit upgrades (move the tag → diff the variables → upgrade-cluster).',
        },
      },
      {
        title: { 'pt-br': '3. Bootstrap do GitOps', en: '3. GitOps bootstrap' },
        text: {
          'pt-br':
            'Um script instala o Argo CD uma única vez com os mesmos values que estão no Git, restaura a chave do Sealed Secrets e aplica a Application raiz. A partir daí o Argo CD gerencia tudo, inclusive a si mesmo.',
          en: 'A script installs Argo CD once with the same values that live in Git, restores the Sealed Secrets key and applies the root Application. From then on Argo CD manages everything, including itself.',
        },
      },
      {
        title: { 'pt-br': '4. Apps', en: '4. Apps' },
        text: {
          'pt-br':
            'A raiz (app-of-apps) sincroniza dois tipos de recurso: Applications escritas à mão para charts de terceiros com versão fixa (Traefik, cert-manager, MetalLB…) e um ApplicationSet que gera uma Application para cada pasta apps/<stack>/<app>, renderizada pelo chart genérico. O namespace é o nome da stack.',
          en: 'The root (app-of-apps) syncs two kinds of resources: hand-written Applications for pinned third-party charts (Traefik, cert-manager, MetalLB…) and an ApplicationSet that generates one Application per apps/<stack>/<app> folder, rendered by the generic chart. The namespace is the stack name.',
        },
      },
      {
        title: { 'pt-br': '5. Tráfego', en: '5. Traffic' },
        text: {
          'pt-br':
            'O MetalLB dá ao Traefik um IP da rede local; as rotas usam a Gateway API; o cert-manager emite um certificado wildcard via DNS-01. Interfaces administrativas ficam atrás de um middleware que só aceita a rede local, e até serviços fora do cluster (UIs do Proxmox, NAS) passam pelo mesmo ingress.',
          en: 'MetalLB gives Traefik a LAN IP; routes use the Gateway API; cert-manager issues a wildcard certificate via DNS-01. Admin UIs sit behind a middleware that only accepts the local network, and even services outside the cluster (Proxmox UIs, NAS) go through the same ingress.',
        },
      },
      {
        title: { 'pt-br': '6. Dados e backup', en: '6. Data and backups' },
        text: {
          'pt-br':
            'Dois tipos de storage: SSD local para bancos SQLite (latência de fsync) e NFS compartilhado (RWX) para mídia e backups. Todo app com dados ganha um CronJob que copia os bancos com a API de backup online do SQLite, roda integrity_check, compacta e aplica retenção. O etcd tem snapshot agendado e a chave do Sealed Secrets fica guardada fora do cluster.',
          en: 'Two kinds of storage: local SSD for SQLite databases (fsync latency) and shared NFS (RWX) for media and backups. Every app with data gets a CronJob that copies databases with the SQLite online backup API, runs integrity_check, compresses and applies retention. etcd has scheduled snapshots and the Sealed Secrets key is stored off-cluster.',
        },
      },
      {
        title: { 'pt-br': '7. Observabilidade', en: '7. Observability' },
        text: {
          'pt-br':
            'victoria-metrics-k8s-stack coleta métricas de nós, pods e volumes; os dashboards do Grafana são ConfigMaps versionados; o Alertmanager manda alertas compactos para o Telegram com um template próprio.',
          en: 'victoria-metrics-k8s-stack collects node, pod and volume metrics; Grafana dashboards are versioned ConfigMaps; Alertmanager sends compact Telegram alerts through a custom template.',
        },
      },
    ],
    decisions: [
      {
        title: { 'pt-br': '2 masters, mas etcd com 3 membros', en: '2 masters, but a 3-member etcd' },
        why: {
          'pt-br':
            'etcd com 2 membros não tolera nenhuma falha — perder um derruba o quórum e a API. O terceiro membro roda num worker, sem VM extra, e uma precondition do Terraform impede número par de membros.',
          en: 'A 2-member etcd tolerates zero failures — losing one drops quorum and the API. The third member runs on a worker, with no extra VM, and a Terraform precondition rejects an even member count.',
        },
        tradeoff: {
          'pt-br': 'Tudo está num único host físico: é HA lógico, protege contra falha de VM, não de hardware.',
          en: 'Everything is on one physical host: this is logical HA, it protects against VM failure, not hardware failure.',
        },
      },
      {
        title: { 'pt-br': 'Medir o disco antes de escolher o host', en: 'Measure the disk before picking the host' },
        why: {
          'pt-br':
            'O etcd precisa de fsync em poucos milissegundos. Um teste fio no SSD do servidor novo deu p99 de 2,38 ms, contra travadas de ~1 s no NVMe anterior. O cluster foi reconstruído no novo host em vez de migrar VMs — com GitOps, reinstalar todos os apps foi trivial.',
          en: 'etcd needs fsync in a few milliseconds. An fio test on the new server\'s SSD gave a p99 of 2.38 ms, versus ~1 s stalls on the previous NVMe. The cluster was rebuilt on the new host instead of migrating VMs — with GitOps, reinstalling every app was trivial.',
        },
      },
      {
        title: { 'pt-br': 'NAS em VM com o HD em passthrough', en: 'NAS in a VM with the disk passed through' },
        why: {
          'pt-br':
            'OpenMediaVault usa ~2 GB de RAM contra ~8 GB do TrueNAS com ZFS, que não traz vantagem com um único disco. Em VM (e não no host ou em LXC) o hipervisor fica limpo e o NFS funciona sem gambiarras.',
          en: 'OpenMediaVault uses ~2 GB of RAM versus ~8 GB for TrueNAS with ZFS, which brings no benefit with a single disk. In a VM (not on the host or in an LXC) the hypervisor stays clean and NFS works without hacks.',
        },
        tradeoff: { 'pt-br': 'Um servidor e um disco: sem HA de storage, compensado por backups.', en: 'One server, one disk: no storage HA, covered by backups.' },
      },
      {
        title: { 'pt-br': 'SSD local para bancos, NFS para o resto', en: 'Local SSD for databases, NFS for the rest' },
        why: {
          'pt-br':
            'SQLite sobre NFS sofre com locks e fsync lento. Bancos ficam em SSD local (o pod fica preso ao nó, aceitável com backup diário); mídia e backups vão para NFS, acessível de qualquer worker. Apagar um PVC arquiva os dados em vez de destruí-los.',
          en: 'SQLite on NFS suffers from locking and slow fsync. Databases live on local SSD (the pod is pinned to its node, acceptable with daily backups); media and backups go to NFS, reachable from any worker. Deleting a PVC archives the data instead of destroying it.',
        },
      },
      {
        title: { 'pt-br': 'Chart genérico + ApplicationSet', en: 'Generic chart + ApplicationSet' },
        why: {
          'pt-br':
            'Um fluxo parecido com "git push → deploy", sem copiar YAML para cada app. Charts de terceiros continuam explícitos, cada um na sua Application com versão fixa.',
          en: 'A "git push → deployed" flow without copying YAML for every app. Third-party charts stay explicit, each in its own pinned Application.',
        },
      },
      {
        title: { 'pt-br': 'Sem overcommit de memória', en: 'No memory overcommit' },
        why: {
          'pt-br':
            'Com ballooning desligado, as VMs enchem a RAM de cache; com overcommit o OOM killer do host pode matar uma VM inteira — inclusive um membro do etcd. As VMs somam a RAM física e redimensionar é sempre um nó por vez: drain → terraform apply -target → esperar Ready e etcd 3/3 → uncordon.',
          en: 'With ballooning off, VMs fill RAM with page cache; with overcommit the host OOM killer could kill a whole VM — including an etcd member. VMs add up to physical RAM, and resizing is always one node at a time: drain → terraform apply -target → wait for Ready and etcd 3/3 → uncordon.',
        },
      },
      {
        title: { 'pt-br': 'Segredos criptografados no Git', en: 'Encrypted secrets in Git' },
        why: {
          'pt-br':
            'Com Sealed Secrets, o repositório guarda só o segredo cifrado; só o controller no cluster decifra. A chave do controller tem backup fora do cluster, então uma reconstrução não perde nenhum segredo.',
          en: 'With Sealed Secrets the repo only holds the encrypted secret; only the in-cluster controller can decrypt it. The controller key is backed up off-cluster, so a rebuild loses no secrets.',
        },
      },
    ],
    challenges: [
      {
        title: { 'pt-br': 'Incidente: API fora do ar após o primeiro sync', en: 'Incident: API down after the first sync' },
        text: {
          'pt-br': [
            'Minutos depois do primeiro sync do Argo CD, o kubectl passou a dar "TLS handshake timeout", o controller-manager entrou em CrashLoop e um master ficou com 29 MB de RAM livre. Aumentar a memória dos masters (um por vez, mantendo o etcd 3/3) não resolveu.',
            'A pista foi a contradição: cada VM fazia só KB/s de IO, mas o host tinha 53% de iowait. Medindo a latência de escrita do disco direto em /proc/diskstats: 1.134 ms por escrita, 46 resets do controlador NVMe e erros de mídia no SMART. Um SSD sem DRAM não aguentava o padrão de fsync do etcd.',
            'Mitigação: desligar o cluster e declarar o estado "parado" no Terraform (variável cluster_running), para que nenhum apply ou reboot o religasse por engano. Correção: mover o cluster para um host com disco medido antes. Lição: falta de memória era sintoma; a causa era latência de disco.',
          ],
          en: [
            'Minutes after Argo CD\'s first sync, kubectl started returning "TLS handshake timeout", the controller-manager went into CrashLoop and a master was down to 29 MB of free RAM. Raising the masters\' memory (one at a time, keeping etcd 3/3) did not fix it.',
            'The clue was a contradiction: each VM did only KB/s of IO, yet the host showed 53% iowait. Measuring disk write latency straight from /proc/diskstats: 1,134 ms per write, 46 NVMe controller resets and media errors in SMART. A DRAM-less SSD could not handle etcd\'s fsync pattern.',
            'Mitigation: shut the cluster down and declare the "stopped" state in Terraform (a cluster_running variable), so no apply or reboot would bring it back by accident. Fix: move the cluster to a host whose disk was measured first. Lesson: low memory was a symptom; the cause was disk latency.',
          ],
        },
      },
      {
        title: { 'pt-br': 'CoreDNS em loop', en: 'CoreDNS forwarding loop' },
        text: {
          'pt-br': [
            'Na primeira instalação o CoreDNS caiu com "plugin/loop" FATAL: sem upstream definido, ele encaminhava para o resolver do nó, que apontava para o nodelocaldns, que encaminhava de volta para o CoreDNS. Corrigido fixando os servidores DNS da rede como upstream no inventário do Kubespray.',
          ],
          en: [
            'On the first install CoreDNS died with a "plugin/loop" FATAL: with no upstream set, it forwarded to the node resolver, which pointed to nodelocaldns, which forwarded back to CoreDNS. Fixed by pinning the network DNS servers as upstream in the Kubespray inventory.',
          ],
        },
      },
    ],
    apps: [
      { group: { 'pt-br': 'Plataforma', en: 'Platform' }, items: ['Argo CD', 'Traefik', 'cert-manager', 'MetalLB', 'Sealed Secrets', 'csi-driver-nfs', 'local-path-provisioner', 'metrics-server', 'etcd backup', 'Headlamp'] },
      { group: { 'pt-br': 'Observabilidade', en: 'Observability' }, items: ['VictoriaMetrics', 'Grafana', 'Alertmanager', 'Uptime Kuma', 'Dashdot'] },
      { group: { 'pt-br': 'Mídia', en: 'Media' }, items: ['Jellyfin', 'Plex', 'Radarr', 'Sonarr', 'Prowlarr', 'Bazarr', 'qBittorrent', 'Seerr'] },
      { group: { 'pt-br': 'Arquivos e casa', en: 'Files & home' }, items: ['Nextcloud', 'MariaDB', 'Filebrowser', 'Homepage', 'Homarr'] },
    ],
  },

  // ───────────────────────────────────────────── Homelab ────────────────
  {
    slug: { 'pt-br': 'homelab-docker', en: 'homelab-docker' },
    title: { 'pt-br': 'Homelab Self-Hosted', en: 'Self-Hosted Homelab' },
    summary: {
      'pt-br':
        'Cluster Proxmox com 3 nós rodando ~20 serviços em Docker Compose, com deploy por GitOps, acesso público sem portas abertas, DNS redundante e backups.',
      en: 'A 3-node Proxmox cluster running ~20 Docker Compose services, with GitOps deploys, public access with no open ports, redundant DNS and backups.',
    },
    stack: ['Proxmox VE', 'Docker Compose', 'Traefik', 'Cloudflare Tunnel', 'AdGuard Home', 'Tailscale', 'Nextcloud', 'Jellyfin', 'Uptime Kuma'],
    metric: { value: '3', label: { 'pt-br': 'nós Proxmox em quórum', en: 'Proxmox nodes in quorum' } },
    repo: 'https://github.com/antony-moreira/homelab',
    body: {
      'pt-br': [
        'É a base de tudo: mídia, arquivos, fotos, backups do Mac, dashboards e automações da casa, rodando em mini PCs de baixo consumo e num servidor que só liga quando precisa.',
        'O repositório é público e serve de documentação: cada stack tem sua pasta, seu README e o passo a passo para recuperá-la. Nenhum segredo vai para o Git — eles ficam só no servidor.',
      ],
      en: [
        'This is the foundation for everything: media, files, photos, Mac backups, dashboards and home automations, running on low-power mini PCs and a server that only powers on when needed.',
        'The repository is public and doubles as documentation: each stack has its own folder, README and recovery steps. No secret ever goes to Git — they only live on the server.',
      ],
    },
    highlights: {
      'pt-br': [
        'Quórum Proxmox com 1 voto por nó: qualquer nó pode cair (ou ser desligado) sem parar o cluster',
        'Deploy por GitOps: git push → Dockhand atualiza a stack',
        'Acesso público via Cloudflare Tunnel — nenhuma porta aberta no roteador',
        'DNS local redundante: dois AdGuard Home em nós diferentes, configuração sincronizada',
        'Backups semanais das VMs e proteção contra encher o disco do sistema se o HD de mídia não montar',
      ],
      en: [
        'Proxmox quorum with 1 vote per node: any node can fail (or be powered off) without stopping the cluster',
        'GitOps deploys: git push → Dockhand updates the stack',
        'Public access through Cloudflare Tunnel — no open ports on the router',
        'Redundant local DNS: two AdGuard Home instances on different nodes, config kept in sync',
        'Weekly VM backups and protection against filling the system disk if the media drive fails to mount',
      ],
    },
    layers: [
      { name: { 'pt-br': 'Acesso', en: 'Access' }, items: ['Cloudflare Tunnel', 'Tailscale', 'AdGuard Home ×2'] },
      { name: { 'pt-br': 'Ingress', en: 'Ingress' }, items: ['Traefik', 'TLS wildcard', 'Docker labels', 'file provider'] },
      { name: { 'pt-br': 'Apps', en: 'Apps' }, items: ['Docker Compose', 'Dockhand (GitOps)'] },
      { name: { 'pt-br': 'Virtualização', en: 'Virtualization' }, items: ['Proxmox VE ×3', 'VMs', 'LXCs', 'vzdump'] },
    ],
    how: [
      {
        title: { 'pt-br': 'Três nós, três papéis', en: 'Three nodes, three roles' },
        text: {
          'pt-br':
            'Um mini PC (Celeron N5095, 16 GB) roda a VM Docker com os apps. Outro (Intel N100, 16 GB), de baixíssimo consumo e sempre ligado, cuida de DNS secundário, VPN e Wake-on-LAN. O servidor maior (Xeon E5-2640 v4, 20 threads, 31 GB) hospeda o cluster Kubernetes e o NAS, e pode ser ligado remotamente.',
          en: 'One mini PC (Celeron N5095, 16 GB) runs the Docker VM with the apps. Another (Intel N100, 16 GB), very low power and always on, handles secondary DNS, VPN and Wake-on-LAN. The bigger server (Xeon E5-2640 v4, 20 threads, 31 GB) hosts the Kubernetes cluster and the NAS, and can be powered on remotely.',
        },
      },
      {
        title: { 'pt-br': 'Deploy', en: 'Deploy' },
        text: {
          'pt-br':
            'Cada stack é uma pasta com docker-compose.yaml. Um git push basta: o Dockhand detecta a mudança e atualiza a stack. Variáveis sensíveis ficam na UI do Dockhand, nunca no repositório público.',
          en: 'Each stack is a folder with a docker-compose.yaml. A git push is enough: Dockhand detects the change and updates the stack. Sensitive variables live in the Dockhand UI, never in the public repo.',
        },
      },
      {
        title: { 'pt-br': 'Entrada de tráfego', en: 'Inbound traffic' },
        text: {
          'pt-br':
            'O Traefik descobre containers por labels e serviços em VMs/LXCs por arquivo. Há dois níveis de domínio: um público, que chega por um túnel de saída da Cloudflare (sem port forwarding), e um interno, resolvido pelo DNS local e acessível só na rede ou via Tailscale.',
          en: 'Traefik discovers containers through labels and VM/LXC services through a file. There are two domain tiers: a public one, reached through an outbound Cloudflare tunnel (no port forwarding), and an internal one, resolved by local DNS and reachable only on the LAN or over Tailscale.',
        },
      },
      {
        title: { 'pt-br': 'Pipeline de mídia', en: 'Media pipeline' },
        text: {
          'pt-br':
            'Um pedido no Seerr vai para Radarr/Sonarr, que buscam nos indexadores do Prowlarr e mandam para o qBittorrent; o arquivo baixado é organizado na biblioteca, o Bazarr busca legendas e Jellyfin/Plex servem para TV e celular.',
          en: 'A request in Seerr goes to Radarr/Sonarr, which search Prowlarr\'s indexers and send it to qBittorrent; the download is organized into the library, Bazarr fetches subtitles and Jellyfin/Plex stream it to TVs and phones.',
        },
      },
    ],
    decisions: [
      {
        title: { 'pt-br': 'Quórum 1-1-1', en: '1-1-1 quorum' },
        why: {
          'pt-br':
            'Cada nó tem um voto e quaisquer dois mantêm o quórum. Os dois mini PCs ficam sempre ligados, então o servidor grande pode ser desligado para economizar energia sem afetar o resto.',
          en: 'Each node has one vote and any two keep quorum. The two mini PCs are always on, so the big server can be powered off to save energy without affecting the rest.',
        },
      },
      {
        title: { 'pt-br': 'Túnel em vez de portas abertas', en: 'A tunnel instead of open ports' },
        why: {
          'pt-br':
            'O cloudflared abre uma conexão de saída; nada na rede de casa fica exposto, e o IP residencial não aparece no DNS público.',
          en: 'cloudflared opens an outbound connection; nothing on the home network is exposed and the home IP never appears in public DNS.',
        },
      },
      {
        title: { 'pt-br': 'Ponto de montagem imutável', en: 'Immutable mountpoint' },
        why: {
          'pt-br':
            'Se o HD de mídia não montar, os apps escreveriam no disco do sistema até enchê-lo. A pasta vazia do ponto de montagem é marcada como imutável (chattr +i): sem o HD, a escrita falha na hora — e um alerta avisa que o disco sumiu.',
          en: 'If the media drive does not mount, apps would write to the system disk until it fills up. The empty mountpoint directory is marked immutable (chattr +i): without the drive, writes fail immediately — and an alert reports the missing disk.',
        },
      },
      {
        title: { 'pt-br': 'Repo público, segredos só no servidor', en: 'Public repo, secrets only on the server' },
        why: {
          'pt-br':
            'O repositório serve de portfólio e documentação; arquivos com segredos têm um .example versionado e a versão real só existe no servidor.',
          en: 'The repo serves as portfolio and documentation; files with secrets have a versioned .example and the real one only exists on the server.',
        },
      },
    ],
    challenges: [
      {
        title: { 'pt-br': 'Migrar para Kubernetes sem parar a casa', en: 'Moving to Kubernetes without downtime at home' },
        text: {
          'pt-br': [
            'As apps foram migradas uma a uma para o cluster, com os dois ambientes rodando em paralelo. Para isso, cada restauração remove o que entraria em conflito — notificações, clientes de download, alvos de sincronização e a identidade do servidor Plex — antes de subir a cópia no cluster.',
          ],
          en: [
            'Apps were moved to the cluster one by one, with both environments running side by side. Each restore removes whatever would conflict — notifications, download clients, sync targets and the Plex server identity — before the cluster copy starts.',
          ],
        },
      },
    ],
    apps: [
      { group: { 'pt-br': 'Rede e acesso', en: 'Network & access' }, items: ['Traefik', 'cloudflared', 'AdGuard Home', 'adguardhome-sync', 'Tailscale', 'UPSnap'] },
      { group: { 'pt-br': 'Mídia', en: 'Media' }, items: ['Jellyfin', 'Plex', 'Radarr', 'Sonarr', 'Prowlarr', 'Bazarr', 'qBittorrent', 'Seerr'] },
      { group: { 'pt-br': 'Arquivos', en: 'Files' }, items: ['Nextcloud', 'Syncthing', 'Filebrowser', 'Time Machine'] },
      { group: { 'pt-br': 'Operação', en: 'Operations' }, items: ['Dockhand', 'Homepage', 'Homarr', 'Uptime Kuma', 'Grafana', 'VictoriaMetrics', 'MCP server'] },
    ],
  },

  // ───────────────────────────────────────────── Observability ──────────
  {
    slug: { 'pt-br': 'observabilidade', en: 'observability' },
    title: { 'pt-br': 'Observabilidade e Alertas', en: 'Observability & Alerting' },
    summary: {
      'pt-br':
        'Troca de Netdata + Prometheus por VictoriaMetrics, com dashboards Grafana como código e alertas compactos no Telegram — com ~90% menos RAM.',
      en: 'Replaced Netdata + Prometheus with VictoriaMetrics, with Grafana dashboards as code and compact Telegram alerts — using ~90% less RAM.',
    },
    stack: ['VictoriaMetrics', 'vmalert', 'Alertmanager', 'Grafana', 'node-exporter', 'cAdvisor', 'SMART', 'amtool'],
    metric: { value: '−90%', label: { 'pt-br': 'de RAM (~1,2 GB → ~110 MiB)', en: 'RAM (~1.2 GB → ~110 MiB)' } },
    repo: 'https://github.com/antony-moreira/homelab/tree/main/apps/monitoring-stack',
    body: {
      'pt-br': [
        'Em hardware modesto, o monitoramento não pode custar mais que as aplicações. A stack antiga (Netdata em cada host + Prometheus) usava ~1,2 GB só na VM principal. A nova faz o mesmo trabalho — e mais — com ~110 MiB.',
        'O mesmo padrão roda nos dois ambientes: no homelab em Docker Compose, no Kubernetes via victoria-metrics-k8s-stack gerenciado pelo Argo CD. Cada um com seu próprio pipeline de alertas.',
      ],
      en: [
        'On modest hardware, monitoring must not cost more than the apps. The old stack (Netdata on every host + Prometheus) used ~1.2 GB on the main VM alone. The new one does the same job — and more — with ~110 MiB.',
        'The same pattern runs in both environments: Docker Compose on the homelab, victoria-metrics-k8s-stack managed by Argo CD on Kubernetes. Each one with its own alerting pipeline.',
      ],
    },
    highlights: {
      'pt-br': [
        'Memória da stack de ~1,2 GB para ~110 MiB, e mais ~250 MiB liberados em cada host Proxmox',
        'Coleta de hosts, containers, temperatura de CPU e saúde SMART dos discos',
        '12 regras de alerta: host fora, disco cheio/ausente, temperatura, SMART, containers no limite de memória, alvos de coleta fora',
        'Template de mensagem próprio: emoji por stack, alvo legível, duração e horário local',
        'Datasources e dashboards provisionados por arquivos versionados — nada configurado à mão na UI',
      ],
      en: [
        'Stack memory from ~1.2 GB to ~110 MiB, plus ~250 MiB freed on each Proxmox host',
        'Collects hosts, containers, CPU temperature and disk SMART health',
        '12 alert rules: host down, disk full/missing, temperature, SMART, containers near their memory limit, scrape targets down',
        'Custom message template: emoji per stack, readable target, duration and local time',
        'Datasources and dashboards provisioned from versioned files — nothing configured by hand in the UI',
      ],
    },
    layers: [
      { name: { 'pt-br': 'Notificação', en: 'Notification' }, items: ['Alertmanager', 'Telegram'] },
      { name: { 'pt-br': 'Regras e visualização', en: 'Rules & dashboards' }, items: ['vmalert', 'Grafana'] },
      { name: { 'pt-br': 'Armazenamento', en: 'Storage' }, items: ['VictoriaMetrics (30 dias)'] },
      { name: { 'pt-br': 'Coleta', en: 'Collection' }, items: ['node-exporter', 'cAdvisor', 'SMART collector'] },
    ],
    how: [
      {
        title: { 'pt-br': 'Coleta', en: 'Collection' },
        text: {
          'pt-br':
            'O VictoriaMetrics faz scrape no formato Prometheus: node-exporter na VM Docker e nos hosts Proxmox (pacote do sistema, com coletor de SMART via textfile), cAdvisor para containers e as métricas dos próprios componentes.',
          en: 'VictoriaMetrics scrapes in Prometheus format: node-exporter on the Docker VM and on the Proxmox hosts (system package, with a textfile SMART collector), cAdvisor for containers and the components\' own metrics.',
        },
      },
      {
        title: { 'pt-br': 'Alertas', en: 'Alerting' },
        text: {
          'pt-br':
            'O vmalert avalia as regras e envia para o Alertmanager, que agrupa por alerta, suprime warnings quando há um critical do mesmo alvo e descarta ruído (Watchdog, severidade info) antes de mandar ao Telegram.',
          en: 'vmalert evaluates the rules and sends to Alertmanager, which groups by alert, suppresses warnings when a critical exists for the same target and drops noise (Watchdog, info severity) before posting to Telegram.',
        },
      },
      {
        title: { 'pt-br': 'Mensagens', en: 'Messages' },
        text: {
          'pt-br':
            'Um template Go próprio gera mensagens de três linhas: severidade + stack com emoji + nome do alerta; resumo e alvo (IPs traduzidos para nomes de nó); horário local. Na resolução, mostra quanto tempo durou. O template é validado com amtool antes do deploy.',
          en: 'A custom Go template builds three-line messages: severity + stack emoji + alert name; summary and target (IPs translated to node names); local time. On resolve, it shows how long it lasted. The template is validated with amtool before deploying.',
        },
      },
    ],
    decisions: [
      {
        title: { 'pt-br': 'VictoriaMetrics em vez de Prometheus', en: 'VictoriaMetrics instead of Prometheus' },
        why: {
          'pt-br':
            'Compatível com PromQL e com os dashboards existentes, um binário só, muito menos RAM e disco para a mesma retenção.',
          en: 'Compatible with PromQL and the existing dashboards, a single binary, far less RAM and disk for the same retention.',
        },
      },
      {
        title: { 'pt-br': 'Cardinalidade sob controle', en: 'Cardinality under control' },
        why: {
          'pt-br':
            'O cAdvisor coleta só CPU, memória e rede, e séries sem nome de container são descartadas no scrape. Menos séries = menos memória, sem perder o que os dashboards usam.',
          en: 'cAdvisor only collects CPU, memory and network, and series without a container name are dropped at scrape time. Fewer series = less memory, without losing anything the dashboards use.',
        },
      },
      {
        title: { 'pt-br': 'Alertas separados por ambiente', en: 'Separate alerting per environment' },
        why: {
          'pt-br':
            'Homelab e cluster têm pipelines independentes: se o cluster cair, os alertas do homelab continuam chegando (e vice-versa). Os dois usam o mesmo bot, com prefixos diferentes.',
          en: 'Homelab and cluster have independent pipelines: if the cluster goes down, homelab alerts keep arriving (and vice versa). Both use the same bot, with different prefixes.',
        },
      },
    ],
    challenges: [
      {
        title: { 'pt-br': 'Grafana "no available server"', en: 'Grafana "no available server"' },
        text: {
          'pt-br': [
            'O Grafana no cluster ficava intermitente. As métricas mostraram o processo colado no limite de 512 MiB, com o garbage collector rodando sem parar e o processo deixando de responder. Subir o limite (mantendo o request baixo) resolveu.',
          ],
          en: [
            'Grafana on the cluster kept flapping. Metrics showed the process pinned at its 512 MiB limit, with the garbage collector running nonstop and the process becoming unresponsive. Raising the limit (keeping the request low) fixed it.',
          ],
        },
      },
    ],
  },

  // ───────────────────────────────────────────── MCP server ─────────────
  {
    slug: { 'pt-br': 'servidor-mcp', en: 'mcp-server' },
    title: { 'pt-br': 'Servidor MCP para Operação com IA', en: 'MCP Server for AI-Assisted Ops' },
    summary: {
      'pt-br':
        'Servidor MCP (Model Context Protocol) em Python que dá a assistentes de IA ferramentas tipadas para operar Docker, Proxmox e SSH, com autenticação OAuth.',
      en: 'A Python MCP (Model Context Protocol) server that gives AI assistants typed tools to operate Docker, Proxmox and SSH, with OAuth authentication.',
    },
    stack: ['Python', 'MCP SDK', 'Proxmox API', 'Docker SDK', 'Paramiko', 'OAuth 2.0 + PKCE', 'Uvicorn'],
    metric: { value: '24', label: { 'pt-br': 'ferramentas expostas', en: 'tools exposed' } },
    repo: 'https://github.com/antony-moreira/homelab/tree/main/apps/mcp-ssh-server',
    body: {
      'pt-br': [
        'Assistentes de IA são úteis em operação quando enxergam o ambiente real. Este servidor expõe as operações do dia a dia como ferramentas com nome, parâmetros e saída estruturada — o assistente escolhe a ferramenta certa em vez de improvisar comandos.',
      ],
      en: [
        'AI assistants are useful in operations when they can see the real environment. This server exposes day-to-day operations as tools with names, parameters and structured output — the assistant picks the right tool instead of improvising commands.',
      ],
    },
    highlights: {
      'pt-br': [
        '24 ferramentas: containers (listar, logs, busca em logs, stats, ações), VMs (status, config, snapshots, rollback, disco, backups), storage, rotas do Traefik e health checks',
        'Acesso remoto autenticado com OAuth 2.0 (Authorization Code + PKCE), usável como conector do Claude',
        'Triagem de incidentes em linguagem natural: "por que esse container reiniciou?"',
        'Empacotado como container e implantado junto com o resto do homelab',
      ],
      en: [
        '24 tools: containers (list, logs, log search, stats, actions), VMs (status, config, snapshots, rollback, disk, backups), storage, Traefik routes and health checks',
        'Authenticated remote access with OAuth 2.0 (Authorization Code + PKCE), usable as a Claude connector',
        'Natural-language incident triage: "why did this container restart?"',
        'Packaged as a container and deployed with the rest of the homelab',
      ],
    },
    how: [
      {
        title: { 'pt-br': 'Três backends', en: 'Three backends' },
        text: {
          'pt-br':
            'Docker via SDK oficial; Proxmox via API REST com token de API; SSH via Paramiko, apenas para os hosts definidos em variáveis de ambiente — o assistente não escolhe destinos arbitrários.',
          en: 'Docker through the official SDK; Proxmox through its REST API with an API token; SSH through Paramiko, only to hosts defined in environment variables — the assistant cannot pick arbitrary targets.',
        },
      },
      {
        title: { 'pt-br': 'Transporte e autenticação', en: 'Transport and auth' },
        text: {
          'pt-br':
            'O servidor fala MCP sobre HTTP (Uvicorn) e implementa o fluxo OAuth exigido por conectores remotos. Fica atrás do Traefik, acessível pela rede local ou pelo túnel público.',
          en: 'The server speaks MCP over HTTP (Uvicorn) and implements the OAuth flow required by remote connectors. It sits behind Traefik, reachable from the LAN or through the public tunnel.',
        },
      },
      {
        title: { 'pt-br': 'Exemplos de uso', en: 'Example workflows' },
        text: {
          'pt-br':
            '"Tire um snapshot da VM antes do upgrade" → snapshot; algo deu errado → rollback. "Esse app está lento?" → stats + busca de erros nos logs. "Os backups rodaram?" → status dos jobs de backup do Proxmox.',
          en: '"Snapshot the VM before the upgrade" → snapshot; something broke → rollback. "Is this app slow?" → stats + error search in logs. "Did the backups run?" → Proxmox backup job status.',
        },
      },
    ],
    decisions: [
      {
        title: { 'pt-br': 'Ferramentas específicas antes de shell genérico', en: 'Specific tools before a generic shell' },
        why: {
          'pt-br':
            'Ferramentas tipadas deixam claro o que cada ação faz, retornam dados estruturados e tornam ações destrutivas explícitas (e fáceis de aprovar ou negar no cliente). O SSH genérico existe, mas como último recurso.',
          en: 'Typed tools make each action\'s effect clear, return structured data and make destructive actions explicit (and easy to approve or deny in the client). Generic SSH exists, but as a last resort.',
        },
      },
    ],
  },
];
