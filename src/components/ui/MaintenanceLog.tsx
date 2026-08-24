import { useState, useMemo } from 'react';
import type { MaintenanceLogProps, MaintenanceEntry } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { Input, Select } from './Input';

const STATUS_CONFIG = {
  completed: { variant: 'ok' as const, label: 'COMPLETADO', icon: '✓' },
  'in-progress': { variant: 'progress' as const, label: 'EN PROGRESO', icon: '⟳' },
  scheduled: { variant: 'scheduled' as const, label: 'PROGRAMADO', icon: '⏰' },
};

const TYPE_OPTIONS = [
  { value: 'all', label: 'TODOS' },
  { value: 'PM', label: 'PREVENTIVO (PM)' },
  { value: 'CM', label: 'CORRECTIVO (CM)' },
];

export function MaintenanceLog({ entries }: MaintenanceLogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'PM' | 'CM'>('all');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);

  const equipmentList = useMemo(() => {
    const eq = [...new Set(entries.map(e => e.equipment))].sort();
    return eq;
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = !searchTerm ||
        entry.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.technician.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'all' || entry.tag.startsWith(typeFilter);

      const matchesEquipment = equipmentFilter === 'all' || entry.equipment === equipmentFilter;

      const matchesDate = (!dateRange[0] || entry.date >= dateRange[0]) &&
        (!dateRange[1] || entry.date <= dateRange[1]);

      return matchesSearch && matchesType && matchesEquipment && matchesDate;
    });
  }, [entries, searchTerm, typeFilter, equipmentFilter, dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 p-4 bg-gauge border border-panel radius-card">
        <div className="flex-1 min-w-[200px]">
          <Input
            tag="FLT-01"
            placeholder="Buscar por TAG, equipo, acción, técnico..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            type="search"
          />
        </div>
        <div className="min-w-[180px]">
          <Select
            tag="FLT-02"
            label="Tipo"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as 'all' | 'PM' | 'CM')}
            options={TYPE_OPTIONS}
          />
        </div>
        <div className="min-w-[200px]">
          <Select
            tag="FLT-03"
            label="Equipo"
            value={equipmentFilter}
            onChange={e => setEquipmentFilter(e.target.value)}
            options={[
              { value: 'all', label: 'TODOS' },
              ...equipmentList.map(eq => ({ value: eq, label: eq })),
            ]}
          />
        </div>
        <div className="flex gap-2 min-w-[300px]">
          <Input
            tag="FLT-04"
            label="Desde"
            type="date"
            value={dateRange[0]}
            onChange={e => setDateRange([e.target.value, dateRange[1]])}
          />
          <Input
            tag="FLT-05"
            label="Hasta"
            type="date"
            value={dateRange[1]}
            onChange={e => setDateRange([dateRange[0], e.target.value])}
          />
        </div>
        <Button variant="secondary" size="sm" onClick={() => { setSearchTerm(''); setTypeFilter('all'); setEquipmentFilter('all'); setDateRange(['', '']); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Limpiar
        </Button>
      </div>

      <div className="flex items-center justify-between text-micro text-muted">
        <span>{filteredEntries.length} de {entries.length} registros</span>
        <span className="font-mono">Última actualización: {new Date().toLocaleDateString('es-VE')}</span>
      </div>

      <div className="overflow-x-auto bg-gauge border border-panel radius-card">
        <table className="w-full" role="grid">
          <thead>
            <tr className="border-b border-panel/50">
              <th className="text-left p-4 text-micro text-muted font-mono uppercase tracking-wider">FECHA</th>
              <th className="text-left p-4 text-micro text-muted font-mono uppercase tracking-wider">TAG</th>
              <th className="text-left p-4 text-micro text-muted font-mono uppercase tracking-wider">EQUIPO</th>
              <th className="text-left p-4 text-micro text-muted font-mono uppercase tracking-wider">ACCIÓN</th>
              <th className="text-left p-4 text-micro text-muted font-mono uppercase tracking-wider">ESTADO</th>
              <th className="text-left p-4 text-micro text-muted font-mono uppercase tracking-wider">TÉCNICO</th>
              <th className="text-left p-4 text-micro text-muted font-mono uppercase tracking-wider">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => {
              const config = STATUS_CONFIG[entry.status];
              return (
                <tr
                  key={`${entry.tag}-${index}`}
                  className={`
                    border-b border-panel/30 hover:bg-panel/50 transition-colors
                    cursor-pointer
                    ${index % 2 === 0 ? 'bg-panel/30' : ''}
                  `}
                  tabIndex={0}
                  role="row"
                >
                  <td className="p-4 text-mono-sm font-mono text-primary">{entry.date}</td>
                  <td className="p-4 text-mono-sm font-mono text-primary">{entry.tag}</td>
                  <td className="p-4 text-small text-primary max-w-xs truncate">{entry.equipment}</td>
                  <td className="p-4 text-small text-secondary max-w-md truncate">{entry.action}</td>
                  <td className="p-4">
                    <Badge variant={config.variant} dot>{config.label}</Badge>
                  </td>
                  <td className="p-4 text-small text-muted">{entry.technician}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {entry.photos && entry.photos.length > 0 && (
                        <Button variant="ghost" size="sm" aria-label={`Ver ${entry.photos.length} fotos de ${entry.tag}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </Button>
                      )}
                      {entry.reportUrl && (
                        <Button variant="ghost" size="sm" aria-label={`Ver reporte técnico de ${entry.tag}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                          </svg>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredEntries.length === 0 && (
          <div className="p-12 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-muted" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p className="text-secondary">No se encontraron registros con los filtros actuales</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-micro text-muted">
        <span>Mostrando 1-{Math.min(filteredEntries.length, 20)} de {filteredEntries.length}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled>Anterior</Button>
          <Button variant="ghost" size="sm" disabled>Siguiente</Button>
        </div>
      </div>
    </div>
  );
}

export function MaintenanceLogCompact({ entries }: { entries: MaintenanceEntry[] }) {
  return (
    <div className="space-y-3">
      {entries.slice(0, 10).map((entry, index) => {
        const config = STATUS_CONFIG[entry.status];
        return (
          <div
            key={`${entry.tag}-${index}`}
            className="bg-gauge border border-panel radius-card p-4 hover:border-pipe-blue-glow/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-mono-sm font-mono text-primary whitespace-nowrap">{entry.date}</span>
                  <span className="text-mono-sm font-mono text-primary whitespace-nowrap">{entry.tag}</span>
                  <Badge variant={config.variant} size="sm">{config.label}</Badge>
                </div>
                <p className="text-small text-secondary mt-1 truncate">{entry.equipment}</p>
              </div>
            </div>
            <p className="text-small text-muted mb-2">{entry.action}</p>
            <div className="flex items-center justify-between text-micro text-muted">
              <span>{entry.technician}</span>
              <div className="flex items-center gap-2">
                {entry.photos && entry.photos.length > 0 && (
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                    </svg>
                    {entry.photos.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}