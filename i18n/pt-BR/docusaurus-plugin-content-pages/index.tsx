import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type NavigationCard = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

const navigationCards: NavigationCard[] = [
  {
    title: 'Primeiros Passos',
    description: 'Aprenda os conceitos básicos da xCloud Platform e configure seu primeiro projeto.',
    icon: '🚀',
    link: '/docs/intro',
  },
  {
    title: 'Referência da CLI',
    description: 'Explore todos os comandos disponíveis na ferramenta de linha de comando da xCloud.',
    icon: '⚡',
    link: '/docs/cli/introduction',
  },
  {
    title: 'Guias de Arquitetura',
    description: 'Entenda a arquitetura de componentes e como estruturar seus projetos.',
    icon: '🏗️',
    link: '/docs/architecture/arquitetura',
  },
  {
    title: 'Tutoriais',
    description: 'Siga tutoriais passo a passo para implementar funcionalidades específicas.',
    icon: '📖',
    link: '/docs/category/guias',
  },
];

function NavigationCard({title, description, icon, link}: NavigationCard) {
  return (
    <div className={clsx('col col--6', styles.navigationCard)}>
      <Link to={link} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>{icon}</div>
          <div className={styles.cardContent}>
            <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
            <p className={styles.cardDescription}>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function HomepageNavigation(): ReactNode {
  return (
    <section className={styles.navigation}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Explore a Documentação</Heading>
          <p>Encontre rapidamente o que você precisa para acelerar seu desenvolvimento</p>
        </div>
        <div className="row">
          {navigationCards.map((props, idx) => (
            <NavigationCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          xCloud Platform
        </Heading>
        <p className="hero__subtitle">
          A moderna plataforma de desenvolvimento e deploy que acelera a criação de aplicações web e mobile com templates, componentes e ferramentas avançadas.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Começar Agora 🚀
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/cli/introduction"
            style={{marginLeft: '1rem'}}>
            Referência da CLI 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A documentação completa para a moderna plataforma de desenvolvimento e deploy da xCloud.">
      <HomepageHeader />
      <main>
        <HomepageNavigation />
      </main>
    </Layout>
  );
}