import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { KpiCard } from '../../components/cards/KpiCard';
import { SalesChart } from '../../components/charts/SalesChart';
import dashboardData from '../../data/dashboardData.json';

import "../../styles/Dashboard/Dashboard.css";

export const Dashboard: React.FC = () => {
    return (
        <Layout>
            <section className="kpi-section">
                {dashboardData.kpiCards.map(card => (
                    <KpiCard key={card.id} data={card} />
                ))}
            </section>

            <SalesChart />
        </Layout>
    );
};