"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Bike } from "@/lib/data";
import { isMotorcycle } from "@/lib/fleet";
import { formatIdrNumber, formatSpecNumber } from "@/lib/format";
import { trackSpecsExpand, trackWhatsAppClick } from "@/lib/analytics";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import type { AppLocale } from "@/i18n/routing";

type FleetSpecsProps = {
  bike: Bike;
};

function specValue(value: number, locale: AppLocale, suffix: string): string {
  return `${formatSpecNumber(value, locale)} ${suffix}`;
}

export default function FleetSpecs({ bike }: FleetSpecsProps) {
  const t = useTranslations("fleet");
  const tCommon = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const panelId = `fleet-specs-${bike.id}-${reactId}`;
  const tipId = `${panelId}-tip`;

  if (!isMotorcycle(bike)) return null;

  const { specs, difficulty, pricing } = bike;
  const difficultyLabel = t(`difficulty.${difficulty}`);
  const highlightsRaw = bike.highlights
    ? t.raw(`highlights.${bike.id}` as never)
    : undefined;
  const highlights = Array.isArray(highlightsRaw) ? (highlightsRaw as string[]) : (bike.highlights ?? []);

  const rateUrl = buildWhatsAppMessageUrl(
    tCommon("whatsappRatePrefill", { name: bike.name }),
  );

  const rows: { key: string; label: string; value: string; note?: string }[] = [
    {
      key: "engine",
      label: t("specEngine"),
      value: specs.engineType,
      note: bike.engineNote === "boredOut" ? t("engineBoredOut") : undefined,
    },
    {
      key: "displacement",
      label: t("specDisplacement"),
      value: specValue(specs.displacementCc, locale, "cc"),
    },
    {
      key: "power",
      label: t("specPower"),
      value: `${formatSpecNumber(specs.powerHp, locale)} hp @ ${formatSpecNumber(specs.powerRpm, locale)} rpm`,
    },
    {
      key: "torque",
      label: t("specTorque"),
      value: `${formatSpecNumber(specs.torqueNm, locale)} Nm @ ${formatSpecNumber(specs.torqueRpm, locale)} rpm`,
    },
    {
      key: "weight",
      label: t("specWeight"),
      value: specValue(specs.weightKg, locale, "kg"),
    },
    {
      key: "seat",
      label: t("specSeatHeight"),
      value: specValue(specs.seatHeightMm, locale, "mm"),
    },
    {
      key: "transmission",
      label: t("specTransmission"),
      value: specs.transmission,
    },
    {
      key: "fuel",
      label: t("specFuelTank"),
      value: specValue(specs.fuelCapacityL, locale, "L"),
    },
  ];

  if (specs.abs !== null) {
    rows.push({
      key: "abs",
      label: t("specAbs"),
      value: specs.abs ? t("yes") : t("no"),
      note: bike.absNote === "frontWheelOnly" ? t("absFrontWheelOnly") : undefined,
    });
  }

  return (
    <div className="mt-4 border-t border-border/80 pt-3">
      <button
        type="button"
        className="fleet-specs-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((current) => {
            const next = !current;
            if (next) trackSpecsExpand(bike.name);
            return next;
          });
        }}
      >
        <span>{t("specs")}</span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className={`fleet-specs-arrow h-4 w-4 ${open ? "is-open" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 7.5 L10 12.5 L15 7.5" />
        </svg>
      </button>

      <div
        id={panelId}
        className={`fleet-specs-panel ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="fleet-specs-panel-inner">
          <dl className="fleet-specs-grid">
            {rows.map((row) => (
              <div key={row.key} className="fleet-spec-row">
                <dt>{row.label}</dt>
                <dd>
                  <span>{row.value}</span>
                  {row.note ? <span className="fleet-spec-note">{row.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>

          {highlights.length > 0 ? (
            <ul className="fleet-spec-chips">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {bike.needsVerification ? (
            <p className="fleet-spec-verify">{t("baseModelNote")}</p>
          ) : null}

          <div className="fleet-difficulty-block">
            <div className="fleet-difficulty-row">
              <div
                className="fleet-difficulty-meter"
                role="img"
                aria-label={`${difficultyLabel}: ${difficulty} / 4`}
              >
                {[1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`fleet-difficulty-seg ${level <= difficulty ? "is-on" : ""}`}
                    data-level={level}
                  />
                ))}
              </div>
              <p className="fleet-difficulty-label">{difficultyLabel}</p>
              <span className="fleet-diff-help">
                <button
                  type="button"
                  className="fleet-diff-help-btn"
                  aria-describedby={tipId}
                  aria-label={t("difficultyHelp")}
                >
                  ?
                </button>
                <span id={tipId} role="tooltip" className="fleet-diff-tip">
                  {t("difficultyTooltip")}
                </span>
              </span>
            </div>
            {bike.hasRiderNote ? (
              <p className="fleet-rider-note">{t(`riderNotes.${bike.id}` as never)}</p>
            ) : null}
          </div>

          <div className="fleet-pricing">
            <p>
              {formatIdrNumber(pricing.day, locale)} IDR {t("perDayShort")}
            </p>
            {pricing.tiers.map((tier) => {
              const range =
                tier.maxDays === null
                  ? t("daysFrom", { min: formatSpecNumber(tier.minDays, locale) })
                  : t("daysRange", {
                      min: formatSpecNumber(tier.minDays, locale),
                      max: formatSpecNumber(tier.maxDays, locale),
                    });
              return (
                <p key={`${tier.minDays}-${tier.maxDays ?? "plus"}`}>
                  {range} — {formatIdrNumber(tier.pricePerDay, locale)} IDR {t("perDayShort")}
                </p>
              );
            })}
            {pricing.week != null ? (
              <p>
                {formatIdrNumber(pricing.week, locale)} IDR {t("perWeekShort")}
              </p>
            ) : null}
            {pricing.month != null ? (
              <p>
                {formatIdrNumber(pricing.month, locale)} IDR {t("perMonthShort")}
              </p>
            ) : null}
            {pricing.week == null || pricing.month == null ? (
              <a
                href={rateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fleet-rate-request"
                onClick={() => trackWhatsAppClick("fleet_specs")}
              >
                {t("rateOnRequest")}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
