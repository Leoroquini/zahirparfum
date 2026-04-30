import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${BRAND.fullName} coleta, usa e protege seus dados pessoais — em conformidade com a LGPD.`,
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Privacidade · LGPD"
        titulo={
          <>
            Seus dados{" "}
            <em className="italic text-amber/90">são seus.</em>
          </>
        }
        descricao="Esta política explica, em português claro, que dados coletamos, pra que usamos, com quem compartilhamos, e seus direitos sobre eles — em conformidade com a Lei Geral de Proteção de Dados (LGPD)."
        backgroundGradient="radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.08), transparent 60%)"
      />

      <section className="bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col gap-10 text-base leading-relaxed text-cream/80">
          <div className="rounded-sm border border-amber/25 bg-amber/5 p-5">
            <p className="text-xs italic text-amber/90">
              ⚠ Rascunho inicial. Este texto deve ser revisado por advogado
              especializado em LGPD antes da entrada oficial em operação e
              coleta real de dados de clientes.
            </p>
          </div>

          <Bloco n="1" t="Quem somos">
            <p>
              {BRAND.fullName} ({BRAND.city}, Brasil) — plataforma online de
              curadoria e venda de perfumes. Para este documento, somos a{" "}
              <strong className="text-cream">Controladora</strong> dos dados
              coletados no Site.
            </p>
          </Bloco>

          <Bloco n="2" t="Que dados coletamos">
            <ul className="flex flex-col gap-3">
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">E-mail:</strong> quando você se
                cadastra na lista de interesse ou completa o quiz olfativo com
                opt-in pra receber o perfil.
              </li>
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">
                  Preferências olfativas:
                </strong>{" "}
                respostas do quiz &quot;O Ritual&quot; e itens adicionados à
                sua lista de reserva (armazenados localmente no seu navegador
                via localStorage).
              </li>
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">Navegação:</strong> via Google
                Analytics 4 (quando ativo) — dados agregados e anonimizados
                sobre páginas visitadas, tempo de leitura, origem do tráfego.
              </li>
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">Pixel de redes sociais:</strong>{" "}
                via Meta Pixel (quando ativo) — pra medir eficácia de anúncios
                e criar audiências de retargeting.
              </li>
            </ul>
          </Bloco>

          <Bloco n="3" t="Pra que usamos">
            <ul className="flex flex-col gap-3">
              <li className="border-l border-amber/50 pl-4">
                Enviar o resultado do quiz e ofertas relevantes (com seu opt-in
                explícito)
              </li>
              <li className="border-l border-amber/50 pl-4">
                Melhorar a curadoria e a experiência do site
              </li>
              <li className="border-l border-amber/50 pl-4">
                Cumprir obrigações legais e contratuais (emissão de NF, prazos
                de entrega, garantia)
              </li>
              <li className="border-l border-amber/50 pl-4">
                Veicular anúncios personalizados em Instagram e Google (com
                sua anuência via banner de cookies)
              </li>
            </ul>
          </Bloco>

          <Bloco n="4" t="Com quem compartilhamos">
            <ul className="flex flex-col gap-3">
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">Serviços financeiros</strong>{" "}
                (bancos e provedores de pagamento, quando aplicável) — apenas
                dados necessários pra transação.
              </li>
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">Transportadoras</strong>{" "}
                (Correios, Loggi) — endereço de entrega apenas.
              </li>
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">
                  Serviços de e-mail marketing
                </strong>{" "}
                (Mailerlite ou similar) — e-mail e preferências olfativas do
                quiz.
              </li>
              <li className="border-l border-amber/50 pl-4">
                <strong className="text-cream">Analytics</strong> (Google,
                Meta) — dados agregados de comportamento. Nunca enviamos nome
                ou e-mail.
              </li>
            </ul>
            <p className="mt-4 text-cream/70">
              Nunca vendemos seus dados. Nunca compartilhamos com terceiros
              fora desses propósitos operacionais.
            </p>
          </Bloco>

          <Bloco n="5" t="Seus direitos (LGPD)">
            <p>Você tem direito a:</p>
            <ul className="mt-3 flex flex-col gap-2 text-cream/75">
              <li>— Saber quais dados temos sobre você</li>
              <li>— Corrigir dados incorretos</li>
              <li>— Solicitar exclusão dos seus dados</li>
              <li>— Receber uma cópia dos seus dados (portabilidade)</li>
              <li>— Revogar consentimento a qualquer momento</li>
              <li>— Saber com quem compartilhamos</li>
            </ul>
            <p className="mt-4">
              Pra exercer qualquer desses direitos, envie e-mail pra{" "}
              <a
                href="mailto:contato@zahirparfums.com.br"
                className="italic text-amber underline-offset-4 hover:underline"
              >
                contato@zahirparfums.com.br
              </a>{" "}
              ou mensagem no Instagram — respondemos em até 15 dias úteis.
            </p>
          </Bloco>

          <Bloco n="6" t="Cookies">
            Usamos cookies essenciais (pra fazer o site funcionar) e cookies
            opcionais de analytics e marketing (com sua anuência via banner).
            Você pode desativar cookies opcionais a qualquer momento nas
            preferências do navegador.
          </Bloco>

          <Bloco n="7" t="Segurança">
            Os dados ficam armazenados em infraestrutura com criptografia em
            trânsito (HTTPS/TLS) e em repouso. Senhas (quando existir login)
            são armazenadas com hash. Nunca pedimos senha por e-mail ou DM.
          </Bloco>

          <Bloco n="8" t="Retenção">
            Mantemos seus dados apenas pelo tempo necessário pra cumprir as
            finalidades listadas. Dados de pedidos ficam armazenados por 5
            anos (obrigação fiscal). Dados de newsletter ficam até você pedir
            descadastramento.
          </Bloco>

          <Bloco n="9" t="Alterações nesta política">
            Podemos atualizar esta política. Alterações relevantes são
            comunicadas por e-mail (pros cadastrados) e no banner superior do
            site por 30 dias.
          </Bloco>

          <p className="mt-6 text-sm italic text-cream/50">
            Última atualização: abril de {BRAND.foundedYear}.
          </p>
        </div>
      </section>
    </>
  );
}

function Bloco({
  n,
  t,
  children,
}: {
  n: string;
  t: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-xs italic text-amber/80">
        {n}. {t}
      </span>
      <div className="font-display text-base font-light leading-[1.55] text-cream/85 md:text-lg">
        {children}
      </div>
    </div>
  );
}
