import { useState } from 'react';
import { faqs } from '../data/faqs';
import { HelpCircle, Plus, Minus, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="faq" className="section-padding bg-soft-cream">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="badge-orange mb-4">
            <HelpCircle className="w-4 h-4" />
            CÂU HỎI THƯỜNG GẶP
          </div>
          <h2 className="heading-2 mb-4">
            Bố mẹ thường hỏi mình{' '}
            <span className="text-gradient-orange-purple">những câu này</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
            Những câu hỏi phụ huynh thường hỏi nhất trước khi quyết định cho con học.
          </p>
        </div>

        {/* Accordion — mobile: 6 câu, desktop: tất cả */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`card-base overflow-hidden transition-all ${
                  isOpen ? 'shadow-lg ring-2 ring-primary-orange/30' : ''
                } ${index >= 6 ? 'hidden sm:block' : ''}`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-soft-cream transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-text-dark flex items-start gap-2 flex-1">
                    <span className="text-primary-orange flex-shrink-0">❓</span>
                    <span>{faq.question}</span>
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition ${
                      isOpen
                        ? 'bg-primary-orange text-white rotate-180'
                        : 'bg-soft-yellow text-primary-orange'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
                      <div className="pl-7 border-l-2 border-primary-orange/30">
                        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA dưới FAQ */}
        <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl p-6 sm:p-7 text-center border-2 border-primary-purple/20 shadow-md">
          <p className="text-sm sm:text-base text-text-dark mb-4">
            Còn câu hỏi khác? <strong>Inbox Zalo</strong> — Sata Robo phản hồi trong{' '}
            <strong className="text-primary-orange">30 phút</strong>.
          </p>
          <a
            href="https://zalo.me/0818823720"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-purple text-white font-bold text-sm sm:text-base rounded-xl
              hover:bg-primary-purple-dark hover:scale-105 transition shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            Chat Zalo Ngay →
          </a>
        </div>
      </div>
    </section>
  );
}
